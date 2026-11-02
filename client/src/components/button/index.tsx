import stl from './Buttons.module.css';
import mapClassList from '../../utils/classAsKey';

type ExtraProps = {
    variant: 'primary' | 'flat'
    status?: 'disabled' | undefined
    size?: 'small' | undefined
}

type ButtonProps = React.ComponentProps<'button'> & ExtraProps;

function Trigger({
    variant = 'primary',
    status = undefined,
    size = undefined,
    className,
    ...props
}: ButtonProps) {
  return (
    <button className={`silkscreen ${mapClassList(stl, 'button', variant, status, size)} ${className} `} {...props} />
  );
}

export default Trigger;
