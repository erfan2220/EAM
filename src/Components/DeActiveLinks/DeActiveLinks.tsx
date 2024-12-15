//@ts-nocheck


const DeActiveLinks = ({url,name  }) => {
    return (
        <div className={`bg-[#F6F6F6] items-center flex flex-col w-[200px] h-[236px] rounded-[8px] pt-[48px]
         px-[60px] pb-[41px] gap-[22px] relative `}>
            <div className="flex justify-center items-center  absolute left-0 top-[12px] rounded-tr-[6px] rounded-br-[6px] bg-[#306DE5] w-[116px] h-[30px]
            text-[12px] text-white text-center">Coming Soon</div>
            <img className="mt-[12px]" src={url} alt=""/>
            <span className="text-[16px]">{name}</span>
        </div>
    );
};

export default DeActiveLinks;