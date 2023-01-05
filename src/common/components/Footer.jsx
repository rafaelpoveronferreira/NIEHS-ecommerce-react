import React from 'react'

class Footer extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className='Container w-full flex flex-row justify-between border-t border-t-solid border-t-gray-400 shadow-black shadow-2xl bg-gray-100'>
                <div className='Left flex flex-col p-5 flex-1'>
                    <span className='Logo text-2xl font-bold m-auto'>N I E H S</span>
                    <p className='text-justify px-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quos ducimus nisi cupiditate alias illo voluptas accusantium impedit eveniet vero? Mollitia deserunt qui repudiandae minus at esse non nam iste?</p>
                    <div className='SocialContainer flex flex-row gap-16 justify-center p-5'>
                        <i className='fa-brands fa-facebook fa-xl'></i>
                        <i className='fa-brands fa-twitter fa-xl'></i>
                        <i className='fa-brands fa-instagram fa-xl'></i>
                    </div>
                </div>
                <div className='Center flex-1 flex flex-col p-5'>
                    <span className='Title text-2xl m-auto flex-1 pb-3'>L I N K S</span>
                    <ul className='flex m-0 p-0 flex-wrap list-none justify-center flex-[4]'>
                    <ListItem item='Home'/>
                        <ListItem item='Cart'/>
                        <ListItem item='Purses'/>
                        <ListItem item='Cart'/>
                        <ListItem item='Orders'/>
                        <ListItem item='Home'/>
                        <ListItem item='Cart'/>
                        <ListItem item='Purses'/>
                        <ListItem item='Cart'/>
                        <ListItem item='Orders'/>
                        <ListItem item='Home'/>
                        <ListItem item='Cart'/>
                        <ListItem item='Purses'/>
                        <ListItem item='Cart'/>
                        <ListItem item='Orders'/>
                    </ul>
                </div>
                <div className='Right flex-1 p-5'>

                </div>

            </div>
        )
    };
};

const ListItem = (props) => {
    return (
        <li className='w-1/3 mb-[10px]'>{props.item}</li>
    )
}

export default Footer;