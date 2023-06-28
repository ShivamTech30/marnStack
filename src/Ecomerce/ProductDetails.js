import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Admin/Sidebar"
import Header from "../Admin/Header";
import { useEffect, useState } from "react";
import { DeleteCart, GetAllProduct, PatchCart, PostAddProduct } from "../Redux/action/ApiCollection";
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
    const [AllProductDetails, setAllProductDetails] = useState([])

    let dispatch = useDispatch()

    const ToggleFunData = useSelector(state => state.ToggleSideBarReducer.ToggleSideBarData)
    const HeaderToggleClassAddData = useSelector((state) => state.HeaderToggleClassAddReducer.HeaderToggleClassAddData);

    const GetAllProductData = useSelector((state) => state.GetAllProductReducer.GetAllProductData?.data?.data);



    useEffect(() => {
        dispatch(GetAllProduct())

    }, [])

    useEffect(() => {
        setAllProductDetails(GetAllProductData)

    }, [GetAllProductData])

    const ShortingFun =(e)=>{
        // asending
        // decending
let quarrayUrl =`?sorting=${e}`
        dispatch(GetAllProduct(quarrayUrl))
        
    }

    const SingleProductDetailsFun = (items) => {
        setSingleProductDetails(items)
        // setSingleProductDetailsPopup(true)

    }

    const FavProductFun = (items) => {

        let array = []
        GetAllProductData.map((item, id) => {
            if (item == items) {
                if (item.fav == false) {
                    item.fav = true
                    array.push(item)
                }
                else {
                    item.fav = false
                    array.push(item)
                }
            }
            else {
                return item
            }
        })

        setFavItem(o => !o)

        dispatch(PatchCart(array[0]))


    }

    const DeleteProduct = (e, items) => {
        dispatch(DeleteCart(items))

    }



    console.log("sndbvhjdcs", AllProductDetails)


    return (
        <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
            <Header />
            <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
                <Sidebar />
                <div className="content-sec  ">

                    <div className="row  ">
                        <h3 className="col-12"> All Product Details</h3>
                        <div className="row">
                            <div className="col-sm-3 " onClick={(e)=>ShortingFun("asending")}> asending </div>
                            <div className="col-sm-3 " onClick={(e)=>ShortingFun("decending")}>
                                decending
                            </div>
                        </div>



                        <div className="row   m-0 p-0">

                            {AllProductDetails?.map((items, id) => {
                                console.log("sgvdbhs", items)
                                return <div className="col-sm-3  p-4  main_product_div" type="button"

                                >
                                    <div className="d-flex"
                                        onClick={(e) => SingleProductDetailsFun(items)}>

                                        <img className="bg-danger fw-bolder" src={items?.product_image} />

                                        <div className="ps-2"
                                        >
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

                                    <div className="d-flex justify-content-center bg-danger pt-3 rounded">
                                        <h6 className="ps-2 fw-bold"
                                            onClick={(e) => DeleteProduct(e, items)}>Delete Product &nbsp;&nbsp;&nbsp;

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="2.5"
                                                stroke="currentColor" className="deleteIcon">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg></h6>

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