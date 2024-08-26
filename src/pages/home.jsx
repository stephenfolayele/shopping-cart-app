import { useEffect, useState } from "react"
import { Circles } from "react-loader-spinner";
import ProductTile from "../product-tile";


export default function Home(){
    const [products, setProducts] = useState([]);
    const [loading, setLoaading] = useState(false)


    async function fetchListOfProducts(){
        setLoaading(true)
        try{
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()
            console.log(data)

            setProducts(data)
            setLoaading(false)

        } catch (e) {
            console.log(e);
            setLoaading(false)
        }
    }

    useEffect(
        ()=>{
            fetchListOfProducts()
        }, []
    )

    return <div>
        {
            loading ?( <div className="min-h-screen w-full flex justify-center items-center">
                <Circles
                height={'120'}
                width={'120'}
                color="rgb(127, 29, 29)"
                visible={true}
                />
            </div>) : (
                <div className="min-h-[80vh] grid sm:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto p-3">
                    {
                        products && products.length?
                        products.map((productItem)=> <ProductTile product={productItem}/> )
                        :null
                    }
                </div>
            )

        }
    </div>
}