import { useState } from 'react';
import styles from './BottomSheet.module.css';

const initHeight = 30;

const BottomSheet = ({children}) => {
    const [y,setY] = useState(initHeight);
    const [move,setMove] = useState(false);
    const [initVal,setInitVal] = useState(0);
    const end= window.innerHeight;
    const mid= window.innerHeight/2;


    const holdFn = (e,type) => {
        if(type =='mouse'){
            setInitVal(e.clientY);
        }else{
            setInitVal(e?.touches[0]?.clientY)
        }
        setMove(true);
    } 
    const moveFn = (e,type) => {
        if(move){
            let val = (type =='mouse') ? e.clientY : e?.touches[0]?.clientY;
            let res = initVal - val;
            setY(pre=>pre + res);    
            setInitVal(val);
            console.log("results::",val,typeof(val),initVal,res)
        }
    }
    const releaseFn = (e) => {
        setMove(false);
        let dist1 = Math.abs(mid-y);
        let dist2 = Math.abs(end-y);
        console.log("distances:",y,dist1,dist2)
        if(y < dist1){
            setY(initHeight)
        }else if(dist1 < dist2 ){
            setY(mid);
        }else{
            setY(end);
        }
    }
    const leaveFn = (e) => {
        setMove(false);
    }

    return <div 
    id={styles.dragEle} 
    style={{
        height:`${y}px`
    }}
    onMouseDown={(e)=>{holdFn(e,"mouse")}}
    onMouseMove={(e)=>{moveFn(e,"mouse")}}
    onMouseUp={(e)=>{releaseFn(e,"mouse")}}
    onMouseLeave={(e)=>{leaveFn(e,"mouse")}}

    onTouchStart={(e)=>{holdFn(e,"touch")}}
    onTouchMove={(e)=>{moveFn(e,"touch")}}
    onTouchEnd={(e)=>{releaseFn(e,"touch")}}
    >
        <div id={styles.cont1}>
            <button 
            onClick={()=>{
                setY(initHeight)
            }}>X</button>
        </div>
        <div>    
        {children}
        </div>
    </div>
}

export {BottomSheet};