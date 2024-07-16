interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className='h-[30px] border'>Header</div>
  )
}

export default Header