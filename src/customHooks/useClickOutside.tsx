import { useEffect , type RefObject} from "react";


export default function useClickOutside <T extends HTMLElement = HTMLElement>( ref: RefObject<T | null> | null , handler : () =>void){

    useEffect(() =>{
    const handleClick = (event : MouseEvent) =>{
        if(ref?.current &&   !ref?.current.contains(event.target as Node)){
            handler();
        }
    }
        document.addEventListener('mousedown', handleClick);
        return ()=> {
               document.removeEventListener('mousedown', handleClick);
        }
    },[ref, handler])

}