import Image from "next/image";

const Logo = ({height, width, image}) => {
    return (
        <Image 
            alt='logo'
            height= {height ? height : "100"}
            width= {width ? width : "100"}
            src={`/images/${image}`}
        />
    )
}

export default Logo;