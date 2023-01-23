import { useEffect, useState } from 'react'
import * as C from './App.styles'
import imgLogo from './assets/devmemory_logo.png'
import imgRestart from './svgs/restart.svg'
import { Button } from './components/Button'
import { InfoItem } from './components/InfoItem'
import { GridItemType } from './Types/GridItemType'
import { Items } from './components/data/Items'
import { GridItem } from './components/GridItem/Index'
import { FormatTimeElipse } from './heapers/FormatTimeElipse'



const App = () =>{
  const [playing,setPlaying] = useState<Boolean>(false)
  const [timeElipsed,setTimeElipsed] = useState<number>(0)
  const [moveCount,setMoveCount] = useState<number>(0)
  const [showCount,setShowCount] = useState<number>(0)
  const [gridItems,setGridItems] = useState<GridItemType[]>([])

  useEffect(()=>{resetCreatGrid()},[])


  useEffect(()=>{
  const timer = setInterval(()=>{
    if(playing) setTimeElipsed(timeElipsed + 1)
  },1000)

  return () => clearInterval(timer)
  },[playing,timeElipsed])


  useEffect(()=>{
    if(showCount ===2){
      let opened = gridItems.filter(item=> item.shown === true)
        if(opened.length === 2){
          let tmpGrid = [...gridItems]
          if(opened[0].item === opened[1].item){

          
            for(let i in tmpGrid){
              if(tmpGrid[i].shown){
                tmpGrid[i].permanentShown = true;
                tmpGrid[i].shown = false
              }
             
            }
            setGridItems(tmpGrid)
            setShowCount(0)
          }else{
           setTimeout(()=>{
            for(let i in tmpGrid){
              tmpGrid[i].shown = false
            }
            setGridItems(tmpGrid)
            setShowCount(0)
           },1000)
          
          }
        

            setMoveCount(moveCount => moveCount +1)
      }

    }

  },[showCount,gridItems])

  useEffect(()=>{
   if(moveCount > 0  && gridItems.every(item => item.permanentShown === true)){
    setPlaying(false)
   }
  },[moveCount,gridItems])

  const resetCreatGrid =()=>{
    //1 passo limpar os dados

    setTimeElipsed(0)
    setMoveCount(0)
    setShowCount(0)
   

    // 2 criar grid
   // 2.1 criar um grid vazio

   let tempGrid: GridItemType[] = []
   for(let i =0; i < (Items.length *2); i++){
   tempGrid.push({
    item: null,
    shown: false,
    permanentShown: false

   })
   }
   //2.2 preencher o grid
     for(let w =0; w < 2; w++){
      for(let i =0; i < Items.length; i ++){
        let pos= -1;
        while(pos < 0 || tempGrid[pos].item !== null){
          pos = Math.floor(Math.random() * (Items.length * 2))
        }
        tempGrid[pos].item = i;
      }
     }
   //2.3 jogar no states
   setGridItems(tempGrid)

   //3 começar o jogo



   setPlaying(true)

  }

  const handleItemClick = (index: number) =>{
    if(playing && index !== null && showCount < 2){
      let tempGrid = [...gridItems];
      if(tempGrid[index].permanentShown === false && tempGrid[index].shown ===false){
         tempGrid[index].shown = true;
         setShowCount(showCount + 1);

      }
      return setGridItems(tempGrid);
    }
  }
return(
  
  <C.container>
 
    <C.info>
      <C.LogoLink href="">
        <img src={imgLogo} width={200} alt="" />
      </C.LogoLink>
      
      <C.InfoArea>
       <InfoItem label='Tempo:' value={FormatTimeElipse(timeElipsed)}/>
       <InfoItem label='Movimentos:' value={moveCount.toString()}/>
      </C.InfoArea>
      <Button  label={'Reiniciar'} icon={imgRestart} onClick={resetCreatGrid} />
    </C.info>
    <C.GridArea>
    <C.Grid>
    {gridItems.map((item,index)=>(
      <GridItem
      key={index}
      item={item}
      onClick={()=> handleItemClick(index)}
      />
    ))}
    </C.Grid>
    </C.GridArea>
  </C.container>
)
}

export  default App