import * as React from 'react';
import './main.css'
import { useState } from 'react';
interface ITictactoe{
}

interface ICellActiveUser{
    Cell:number,
    IsFirstPlayerActive:boolean
}

interface IWinningSequence{
    SequenceNo:number,
    Sequence:number[]
}


          
const WinningSequence:IWinningSequence[]=
[
    {
        SequenceNo:1,
        Sequence:[1,2,3]
    },
    {
        SequenceNo:2,
        Sequence:[4,5,6]
    },
    {
        SequenceNo:3,
        Sequence:[7,8,9]
    },
    {
        SequenceNo:4,
        Sequence:[1,4,7]
    },
    {
        SequenceNo:5,
        Sequence:[2,5,8]
    },
    {
        SequenceNo:6,
        Sequence:[3,6,9]
    },
    {
        SequenceNo:7,
        Sequence:[1,5,9]
    },
    {
        SequenceNo:7,
        Sequence:[3,5,7]
    },
]       

function Tictactoe(props:ITictactoe) {

    const cells:number[]=[1,2,3,4,5,6,7,8,9];
    const rows:number[]=cells.filter(e=>e%3==0).map(s=>s/3);
    const [IsFirstPlayerActive,setFirstPlayerActive]=useState<boolean>(true);
    const [CellActiveUsers,setCellActiveUsers]=useState<ICellActiveUser[]>([]);
    const [winner,setWinner]=useState<string>("");

    const Reset=()=>
    {
        setFirstPlayerActive(true);
        setCellActiveUsers([]);
        setWinner("");
    }

    const SetActiveCellValues=(cellIndex:number,rowIndex:number)=>
    {
        const FirstPlayerActive=IsFirstPlayerActive;
        const ActiveCells=CellActiveUsers
        const index=((cellIndex-1)+(rowIndex-1)*3);
        
        if(CellActiveUsers.filter(e=>e.Cell==(index+1)).length<=0)
        {
            ActiveCells.push({Cell:index+1,IsFirstPlayerActive:FirstPlayerActive});
            setCellActiveUsers(ActiveCells);
            

            const ActiveCellsForActivePlayer=ActiveCells.filter(e=>e.IsFirstPlayerActive==IsFirstPlayerActive).map(e=>e.Cell);

           let checker = (arr:number[], target:number[]) => target.every(v => arr.includes(v));

           for(let s of WinningSequence) {
                if(checker(ActiveCellsForActivePlayer, s.Sequence)){
                   setWinner(FirstPlayerActive?"First Player":"Second Player")
                   break;
                }
          }

            setFirstPlayerActive(!IsFirstPlayerActive);
            console.log(ActiveCellsForActivePlayer);
        }
    }


    React.useEffect(()=>{

    },[])


    return (
        <div className="container">
            {
                rows.map((rowIndex, rindex) => {
                return (
                 <div className="row">
                     {
                        [1,2,3].map((columIndex, cindex) => {
                            return (
                                <button className={`column column${columIndex}`} 
                                        onClick={()=>SetActiveCellValues(columIndex,rowIndex)}>

                                {
                                ((CellActiveUsers.filter(e=>e.Cell==(((rowIndex-1)*3)+(columIndex-1)+1) && e.IsFirstPlayerActive==true).length>0)?
                                "x":
                                ((CellActiveUsers.filter(e=>e.Cell==(((rowIndex-1)*3)+(columIndex-1)+1) && e.IsFirstPlayerActive==false).length>0)?"o":"")
                                )
                                }

                                   
                                </button>  
                          
                            )
                            })
                     }
                </div>
                )
                })
            }
         
           
    
         <div className="row">
         <div className={`column-3`} >
           
         
         <span>x-First Player 
             o-Second Player </span>
             <button onClick={()=>Reset()}>Reset</button>
        
         </div>

         
             </div>

         <div className="row">
         <div className={`column`} >
          
         </div>
         <div className={`column winner`} >
          {winner.length>0?`Winner : ${winner}`:``}
         </div>
         <div className={`column`} >
         </div>

         
             </div>

           
        </div>
      
    );
  }

  export {Tictactoe};


