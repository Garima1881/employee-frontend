import React from "react";
import  * as Icon from "@mui/icons-material" ;
import { type SvgIconProps  } from "@mui/material";

interface MyIconProps  extends SvgIconProps{
    iconName : keyof typeof Icon
}

const MyIcon : React.FC<MyIconProps> = ({iconName , ...props}) =>{
 const IconComponent = Icon[iconName]
    return(
        <IconComponent {...props} />
    )
}

export default MyIcon