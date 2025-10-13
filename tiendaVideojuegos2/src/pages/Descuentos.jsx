import ProductCard from "../components/ProductCard";
import ProductCard2 from "../components/ProductCard2";
import DescuentosData from "../data/DescuentosData";    


export default function Descuentos() {
    return (
        <div className="container my-5 bg-dark text-white">
            <h2 className="text-center text-warning mb-4">
                Descuentos y Promociones

            </h2>
           <div className="row row-cols-1 row-cols-md-5 g-4">
                {DescuentosData.map((P)=>(
                    <ProductCard2 
                    key={P.id}
                    
                    img={P.img}
                    title={P.title}
                    priceOriginal={'$${p.priceOriginal.toLocaleString()}'}
                    priceDiscount={P.priceDiscount}
                    
                    
                    
                     />
                ))}
            </div> 
        </div>


    )
}