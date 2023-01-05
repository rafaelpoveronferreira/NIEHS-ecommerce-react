const LangToggle = ({ children }) => {


  document.addEventListener('click', (e) => {
    const isClickingInLangIcon = e.target.closest('#langicon');

    if (!isClickingInLangIcon) {
      console.log('change redux language selector')
    }
  });

  return children({ onClickToggle });
};

export default LangToggle;