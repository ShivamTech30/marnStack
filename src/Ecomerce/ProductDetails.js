import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Admin/Sidebar"
import Header from "../Admin/Header";
import { useEffect, useState } from "react";
import { GetAllProduct, PostAddProduct } from "../Redux/action/ApiCollection";
import { Label } from "recharts";
import Popup from "reactjs-popup";
import axios from "axios";



const ProductDetails = () => {



    const [ProductName, setProductName] = useState("")
    const [ProductPrice, setProductPrice] = useState("")
    const [ProductBrand, setProductBrand] = useState("")
    const [ProductImage, setProductImage] = useState("")

    const [SingleProductDetails, setSingleProductDetails] = useState("")
    const [SingleProductDetailsPopup, setSingleProductDetailsPopup] = useState(false)
    const [FavItem, setFavItem] = useState(false)


    let dispatch = useDispatch()

    const ToggleFunData = useSelector(state => state.ToggleSideBarReducer.ToggleSideBarData)
    const HeaderToggleClassAddData = useSelector((state) => state.HeaderToggleClassAddReducer.HeaderToggleClassAddData);

    const GetAllProductData = useSelector((state) => state.GetAllProductReducer.GetAllProductData?.data?.data);



    useEffect(() => {
        dispatch(GetAllProduct())

    }, [])




    const SingleProductDetailsFun = (items) => {
        setSingleProductDetails(items)
        setSingleProductDetailsPopup(true)

    }

    const FavProductFun =(items)=>{

console.log("ngscdnhgvd",items)

        setFavItem(o=>!o)
        // let data={
        //     userId:req.user._id,
        //     product_id:idDetails._id
        // }``

    }


    console.log("jgstfygd", FavItem)


    return (
        <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
            <Header />
            <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
                <Sidebar />
                <div className="content-sec  ">
                     

                    <div className="row  ">
                        <h3 className="col-12"> All Product Details</h3>
                        <div className="row  m-0 p-0">

                            {GetAllProductData?.map((items, id) => {
                                console.log("sgvdbhs", items)
                                return <div className="col-sm-4 p-4 " type="button"
                                    // onClick={(e) => SingleProductDetailsFun(items)}
                                    >
                                    <div className="d-flex">

                                        <img className="bg-danger fw-bolder" src={items?.product_image} height="300" width="400" />

                                        <div className="ps-2">
                                            {
                                            // FavItem==false && 
                                            items.fav !== true ? <span 
                                            onClick={(e) => FavProductFun(items)}>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="_1l0elc" width="28" height="28" viewBox="0 0 20 16">
                                                    <path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="darkgrey" class="eX72wL" stroke="#FFF" fill-rule="evenodd" opacity=".9"></path></svg>
                                            </span> :
                                                <span 
                                                onClick={(e) => FavProductFun(items)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        class="_1l0elc" width="28" height="28" viewBox="0 0 20 16">
                                                        <path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="red" class="eX72wL" stroke="#FFF" fill-rule="evenodd" opacity=".9"></path></svg>
                                                </span>}
                                        </div>
                                    </div>
                                    <div className="pt-3">
                                        <div className="d-flex">
                                            <h6 className="ps-2 fw-bold">Product Name - </h6>

                                            <h6 className="ps-2">{items?.product_name}</h6>

                                        </div>


                                        <div className="d-flex">
                                            <h6 className="ps-2 fw-bold">Product Price - </h6>

                                            <h6 className="ps-2">Rs. {items?.product_price} /-</h6>

                                        </div>

                                        <div className="d-flex">
                                            <h6 className="ps-2 fw-bold">Product Brand - </h6>

                                            <h6 className="ps-2">{items?.product_brand}</h6>

                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <button
                                            // onClick={(e) => AddProductFun(e)}
                                            type="button"
                                            className="btn next-btn me-5"
                                        >
                                            {" "}
                                            Buy now{" "}
                                        </button>

                                        <button
                                            // onClick={(e) => AddProductFun(e)}
                                            type="button"
                                            className="btn next-btn me-5"
                                        >
                                            {" "}

                                            Add cart{" "}
                                        </button>
                                    </div>



                                </div>
                            })}





                        </div>
                        
                    </div>
                </div>
            </div>

            <Popup open={SingleProductDetailsPopup} position="" model className="sign_up_loader">
                <div className="container">
                    <div className='loader-sec'>
                        <div className=" data_picker rounded  bg-white">
                            <div className='py-1 text-warning'>

                                <h4 className='text-danger calender_popup_cancel'
                                    onClick={(e) => setSingleProductDetailsPopup(false)}> X </h4>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 p-4"
                                
                                >

                                    <img className="bg-danger fw-bolder" src={SingleProductDetails?.product_image} height="300" width="400" />
                                    <div className="pt-3">
                                        <div className="d-flex">
                                            <h6 className="ps-2 fw-bold">Product Name - </h6>

                                            <h6 className="ps-2">{SingleProductDetails?.product_name}</h6>

                                        </div>


                                        <div className="d-flex">
                                            <h6 className="ps-2 fw-bold">Product Price - </h6>

                                            <h6 className="ps-2">Rs. {SingleProductDetails?.product_price} /-</h6>

                                        </div>

                                        <div className="d-flex">
                                            <h6 className="ps-2 fw-bold">Product Brand - </h6>

                                            <h6 className="ps-2">{SingleProductDetails?.product_brand}</h6>

                                        </div>
                                    </div>


                                </div>

                            </div>
                            <div className=" ">
                                <button
                                    className="data_picker_btn"
                                //   onClick={(e) => DatePickerSaveFun(e)}
                                > Confirm </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )

}
export default ProductDetails