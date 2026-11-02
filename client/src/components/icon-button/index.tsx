import stl from './icon-button.module.css';
import { forwardRef } from 'react';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  root: string;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, name, root, ...props }, ref) => {
    return (
      <button ref={ref} className={`${stl.button} ${className}`} name={name} {...props}>
        <div style={{
          maskImage: `url(${root})`,
          maskRepeat: 'no-repeat',
          maskSize: 'contain',
          maskPosition: 'center',
          WebkitMaskImage: `url(${root})`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          WebkitMaskPosition: 'center'
        }}></div>
      </button>
    );
  }
);

export default IconButton;
