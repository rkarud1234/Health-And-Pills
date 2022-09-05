const MenuButton = () => {
  const onHandleMenu = () => {
    console.log("메뉴 클릭");
  };
  return (
    <button onClick={onHandleMenu}>
      <i className="fas fa-bars"></i>
    </button>
  );
};

export default MenuButton;
