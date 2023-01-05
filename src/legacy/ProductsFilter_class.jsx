import React from 'react'

export default class ProductsFilter extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return(
            <div className='pt-20 w-full flex justify-between'>
                <div className='m-[20px] flex flex-col sm:block'>
                    <span className='text-xl font-semibold mr-[20] sm:mr-0'>
                        Filter Products
                    </span>
                    <select onChange={this.props.handleFilter} name="color" className='p-[10px] mr-[20px]'>
                        <option defaultValue value=''>
                            all colors
                        </option>
                        <option value="white">
                            white
                        </option>
                        <option value="black">
                            black
                        </option>
                        <option value="red">
                            red
                        </option>
                        <option value="blue">
                            blue
                        </option>
                        <option value="yellow">
                            yellow
                        </option>
                        <option value="green">
                            green
                        </option>
                        <option value="purple">
                            purple
                        </option>

                    </select>

                    <select onChange={this.props.handleFilter} name="size" className='p-[10px] mr-[20px]'>
                        <option defaultValue value=''>
                            all sizes
                        </option>
                        <option value="XL">
                            XL
                        </option>
                        <option value="L">
                            L
                        </option>
                        <option value="M">
                            M
                        </option>
                        <option value="S">
                            S
                        </option>
                    </select>
                </div>


                <div className='m-[20px] flex flex-col sm:block'>
                    <span className='text-xl font-semibold mr-[20px] sm:mr-0'>
                        Filter Products
                    </span>
                    <select onChange={this.props.handleFilter} name="order" className='p-[10px] mr-[20px]'>
                        <option value="newest">
                            Newest
                        </option>
                        <option value="asc">
                            Price (asc)
                        </option>
                        <option value="desc">
                            Price (desc)
                        </option>
                    </select>
                
                </div>
            </div>
        )
    }
}