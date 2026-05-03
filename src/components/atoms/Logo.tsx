import Image from 'next/image';
type LogoProps = {
  showText?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
  textClassName?: string;
};

const Logo = ({
  showText = true,
  title = 'Tian Group',
  subtitle = 'Yangzhou University',
  className = '',
  textClassName = '',
}: LogoProps) => (
  <span className={`inline-flex items-center gap-3 ${className}`}>
    <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
    {showText && (
      <span className={`leading-tight ${textClassName}`}>
        <span className="block text-sm font-semibold text-slate-950 dark:text-white">{title}</span>
        <span className="block text-xs text-slate-500 dark:text-slate-400">{subtitle}</span>
      </span>
    )}
  </span>
);

export default Logo;
