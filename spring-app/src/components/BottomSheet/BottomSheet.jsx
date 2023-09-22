import { useState } from 'react';
import styles from './BottomSheet.module.css';

const initHeight = 40;

// we can pass the custom width to the component  ** customWidth **

const BottomSheet = ({children,customWidth='100%'}) => {
    const [y,setY] = useState(initHeight);
    const [move,setMove] = useState(false);
    const [initVal,setInitVal] = useState(0);
    const end= window.innerHeight;
    const mid= window.innerHeight/2;

// when we hold the container :
    const holdFn = (e,type) => {
        if(type =='mouse'){
            setInitVal(e.clientY);
        }else{
            setInitVal(e?.touches[0]?.clientY)
        }
        setMove(true);
    } 

    // when we are dragging the container :
    const moveFn = (e,type) => {
        if(move){
            let val = (type =='mouse') ? e.clientY : e?.touches[0]?.clientY;
            let res = initVal - val;
            setY(pre=>pre + res);    
            setInitVal(val);
        }
    }

    //when we relase the container from dragging :
    const releaseFn = (e) => {
        setMove(false);
        let dist1 = Math.abs(mid-y);
        let dist2 = Math.abs(end-y);
        if(y < dist1){
            setY(initHeight)
        }else if(dist1 < dist2 ){
            setY(mid);
        }else{
            setY(end);
        }
    }

    return <div 
    id={styles.dragEle} 
    style={{
        width : `${customWidth}` ,
        height:`${y}px`,
        transition : (move) ? "0s" : "3s"
    }}
    // while using mouse :
    onMouseDown={(e)=>{holdFn(e,"mouse")}}
    onMouseMove={(e)=>{moveFn(e,"mouse")}}
    onMouseUp={(e)=>{releaseFn(e,"mouse")}}
    onMouseLeave={(e)=>{releaseFn(e,"mouse")}}

    // while using touch screen :
    onTouchStart={(e)=>{holdFn(e,"touch")}}
    onTouchMove={(e)=>{moveFn(e,"touch")}}
    onTouchEnd={(e)=>{releaseFn(e,"touch")}}
    >
        <div id={styles.cont1}>
            <button 
            id={styles.closeBtn}
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