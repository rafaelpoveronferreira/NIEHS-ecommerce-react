import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';
import {popularProducts} from './../data.js'

class Products extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.products)
        return (
            <div className='Container p-[20px] flex flex-wrap justify-between'>
            {this.props.products.length?
                this.props.products.map((e) => {
                        return (
                                <Link to={`../product/${e._id}`} key={e._id}>
                                    <Product
                                        item={e}
                                        filteredColor={this.props.filteredColor}
                                        filteredSize={this.props.filteredSize}
                                    />
                                </Link>
                            )
                        })
            :<div className='w-full h-full flex flex-wrap justify-between'>
                <p className='flex-1 m-[50px]'>{this.props.products.length?<>asdasdasd</>:<Skeleton width="100%" count={6}/>}</p>
                <p className='flex-1 m-[50px]'>{this.props.products.length?<>asdasdasd</>:<Skeleton width="100%" count={6}/>}</p>
                <p className='flex-1 m-[50px]'>{this.props.products.length?<>asdasdasd</>:<Skeleton width="100%" count={6}/>}</p>
            </div>
            }
            </div>
        )
    };

};

const Product = (props) => {
    return (
        <div
            className='group duration-300 bg-[rgb(245,251,253)] ease-in relative flex-1 flex justify-center text-center m-[50px] min-w-[280px] h-[350px] '
            >
            <img
                className='group-hover:scale-110 ease-in duration-300 absolute top-8 z-[3] h-3/4'
                src={`../src/assets/products/${props.item._id}_1_${props.filteredColor?props.filteredColor:props.item.color[0]}.webp`}
                />
            <div className='hover:bg-[rgb(0,0,0,0.2)] bg-[rgb(0,0,0,0)] z-[4] absolute w-full h-full top-0 left-0 flex items-center gap-7 justify-center duration-500 cursor-pointer'>
                <Icon icon='fa-solid fa-cart-shopping fa-xl' />
                <Icon icon='fa-solid fa-magnifying-glass fa-xl'/>
                <Icon icon='fa-solid fa-heart fa-xl'/>
            </div>

        </div>
    )
};

const Icon = (props) => {
    return (
    <div className='Icon flex gap-4 items-center justify-center w-[50px] h-[50px] rounded-[50%] bg-white duration-500 ease-in hover:scale-110'>
        <i className={props.icon}></i> 
    </div>
    )
}

export default Products;