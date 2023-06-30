import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Admin/Sidebar"
import Header from "../Admin/Header";
import { useState } from "react";
import { PostAddProduct } from "../Redux/action/ApiCollection";

const AddProducts = () => {



    const [ProductName, setProductName] = useState("")
    const [ProductPrice, setProductPrice] = useState("")
    const [ProductBrand, setProductBrand] = useState("")
    const [ProductImage, setProductImage] = useState("")

    let dispatch =useDispatch()

    const ToggleFunData = useSelector(state => state.ToggleSideBarReducer.ToggleSideBarData)
    const HeaderToggleClassAddData = useSelector((state) => state.HeaderToggleClassAddReducer.HeaderToggleClassAddData);



    const AddProductFun = () => {

        

        let addProductPayload = {
            "product_name": ProductName,
            "product_price": ProductPrice,
            "product_brand": ProductBrand,
            "productImage": ProductImage,
            "fav":false
        }

        dispatch(PostAddProduct(addProductPayload))
    }

     


    return (
        <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
            <Header />
            <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
                <Sidebar />
                <div className="content-sec">
                    <div className="dashboardcontent-title">
                        <h2>Add Product </h2>
                    </div>

                    <div className="row">
                        <h3 className="col-12  ">Add your product details</h3>
                        <div className="row  m-0 p-0">
                            <div className="col-md-4 mt-2">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    name="pickupname"
                                    className="form-control mt-1"
                                    placeholder="Name"
                                    value={ProductName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>

                            <div className="col-md-4 mt-2">
                                <label>Product Price</label>
                                <input
                                    type="number"
                                    name="pickupname"
                                    className="form-control mt-1"
                                    placeholder="Price..."
                                    value={ProductPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </div>
                            <div className="col-md-4 mt-2">
                                <label>Product Brand</label>
                                <input
                                    type="text"
                                    name="pickupname"
                                    className="form-control mt-1"
                                    placeholder="Brand..."
                                    value={ProductBrand}
                                    onChange={(e) => setProductBrand(e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 mt-5">
                                <label>Product Image</label>
                                <input
                                    type="file"
                                    name="pickupname"
                                    className="form-control mt-1"
                                    placeholder="Brand..."
                                    // value={ProductImage}
                                    onChange={(e) => setProductImage(e?.target?.files[0])}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <button
                                onClick={(e) => AddProductFun(e)}
                                type="button"
                                className="btn next-btn"
                            >
                                {" "}
                                Add Product{" "}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default AddProducts