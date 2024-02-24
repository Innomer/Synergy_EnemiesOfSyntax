type ButtonWithShootingStarBorderProps = {
  onClick?: () => void;
  ButtonInnerContent: React.ReactNode | string;
};

export const ButtonWithShootingStarBorder = ({
  onClick,
  ButtonInnerContent,
}: ButtonWithShootingStarBorderProps) => {
  return (
    <button
      onClick={() => onClick && onClick()}
      className="group relative grid overflow-hidden rounded-lg px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200"
    >
      <span>
        <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-lg [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
      </span>
      <span className="backdrop absolute inset-[1px] rounded-lg bg-success " />
      <span className="z-10 py-0.5 text-sm transiton text-neutral-600 group-hover:text-neutral-950">
        {ButtonInnerContent}
      </span>
    </button>
  );
};
