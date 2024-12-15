//@ts-nocheck


const Links = ({url,name  }) => {
    return (
        <div className={`bg-white items-center flex flex-col w-[200px] h-[236px] rounded-[8px] pt-[48px]
         px-[60px] pb-[41px] gap-[22px] cursor-pointer`}>
            <img  className="mt-[12px]" src={url} alt=""/>
            <span>{name}</span>
        </div>
    );
};

export default Links;