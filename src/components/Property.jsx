import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TbRulerMeasure2, TbRulerMeasure } from "react-icons/tb";
import { MdHome, MdOutlineBedroomParent } from "react-icons/md";
import { FaBath, FaWhatsapp } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../API/baseURL";
import Modal from "react-modal";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";

Modal.setAppElement("#root");

export default function Property() {
    const toggle = useSelector((state) => state.toggle.value);
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/properties/${id}`);
                setProperty(res.data);
            } catch (error) {
                console.error("Error fetching property:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const openModal = (index) => {
        setStartIndex(index);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this property?");
        if (!confirmDelete) return;
        try {
            await axios.delete(`http://localhost:5000/properties/${id}`);
            alert("Property deleted successfully");
            navigate("/properties");
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete property");
        }
    };

    const [soldForm, setSoldForm] = useState({
        buyerName: "",
        sellerName: "",
        commission: "",
        soldByUs: false, 
        soldAt: "", 
    });
    const [openDialog, setOpenDialog] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSoldForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const markAsSold = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${baseURL}/properties/mark-sold`, {
                ...soldForm,
                soldout: true,
                id
            });
            alert("Property marked as sold!");
            setOpenDialog(false);
            window.location.reload();
        } catch (error) {
            console.error("Error marking as sold:", error);
            alert("Failed to mark property as sold.");
        }
    };



    if (loading) return <div className="text-center my-10">Loading...</div>;
    if (!property) return <div className="text-center my-10">Property not found</div>;

    return (
        <div
            className={`${toggle === false
                ? "w-full"
                : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"
                } duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6 `}
        >
            <section className="mt-[10px] relative">
                {/* Mobile Swiper */}
                <div className=" block md:hidden">
                    <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }}>
                        {property?.media?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    onClick={() => openModal(index)}
                                    className="w-full h-[500px]  rounded-lg overflow-hidden cursor-pointer flex items-center justify-center"
                                >
                                    {item.type === "image" ? (
                                        <img src={`${baseURL}/images/${item.src}`} alt={`media-${index}`} className="h-full object-contain" />
                                    ) : (
                                        <video controls autoPlay className="h-full object-contain">
                                            <source src={`${baseURL}/images/${item.src}`} type="video/mp4" />
                                        </video>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Desktop Swiper */}
                <div className=" hidden md:flex">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={20}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        className="w-full"
                    >
                        {property?.media?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    onClick={() => openModal(index)}
                                    className="flex justify-center items-center h-full  rounded-lg overflow-hidden shadow cursor-pointer"
                                >
                                    {item.type === "image" ? (
                                        <img src={`${baseURL}/images/${item.src}`} alt={`media-${index}`} className="h-full w-full object-contain" />
                                    ) : (
                                        <video controls autoPlay className="h-full object-contain">
                                            <source src={`${baseURL}/images/${item.src}`} type="video/mp4" />
                                        </video>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Modal with Swiper */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    overlayClassName="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                    className="outline-none w-full max-w-[90%] h-[90vh] relative"
                >
                    <button onClick={closeModal} className="absolute top-10 right-4 text-white text-3xl z-50 text-[30px]"><RxCross1 className="text-white text-3xl z-50 text-[30px]" /></button>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        initialSlide={startIndex}
                        className="w-full h-full"
                    >
                        {property?.media?.map((item, index) => (
                            <SwiperSlide key={index} className="flex items-center justify-center bg-black">
                                {item.type === "image" ? (
                                    <img
                                        src={`${baseURL}/images/${item.src}`}
                                        alt={`modal-media-${index}`}
                                        className="max-h-full max-w-full mx-auto object-contain"
                                    />
                                ) : (
                                    <video controls autoPlay className="max-h-full  mx-auto max-w-full object-contain">
                                        <source src={`${baseURL}/images/${item.src}`} type="video/mp4" />
                                    </video>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Modal>

                {/* details in rows  */}
                <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-[10px]  my-[20px]" >
                    <div className="flex items-center justify-center gap-[5px] border-x-2  border-[#1E1E1F] py-[20px]">

                        <MdHome className="text-[30px]" />
                        <p className="pp">
                            For {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-[5px] border-x-2 border-[#1E1E1F] py-[20px]">
                        <TbRulerMeasure2 className="text-[30px]" />
                        <p className="pp">
                            {property?.measurement}{" "}
                            {property?.measurement > 1
                                ? property.unit === "marla"
                                    ? "Marlas"
                                    : "Kanals"
                                : property.unit === "marla"
                                    ? "Marla"
                                    : "Kanal"}
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-[5px] border-x-2 border-[#1E1E1F] py-[20px]">
                        <MdOutlineBedroomParent className="text-[30px]" />
                        <p className="pp">
                            {property.rooms} {property.rooms <= 1 ? "Room" : "Rooms"}
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-[5px] border-x-2 border-[#1E1E1F] py-[20px]">
                        <FaBath className="text-[30px]" />
                        <p className="pp">
                            {property.bath} {property.bath <= 1 ? "Bath" : "Baths"}
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-[5px] border-x-2 border-[#1E1E1F] py-[20px]">
                        <TbRulerMeasure className="text-[30px]" />
                        <p className="pp">
                            {property.front} Front
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-[5px] py-[20px] border-[#1E1E1F] border-x-2">
                        <TbRulerMeasure className="text-[30px]" />
                        <p className="pp">
                            {property.back} Back
                        </p>
                    </div>
                </div>
                {/* details in para */}
                <div className=" mt-[10px]" >
                    {property.soldout == true && (
                        <p className="text-[red]">Soldout</p>
                    )}
                    {property.soldout == false && (
                        <p className="text-[green]">Available</p>
                    )}
                    <h3 className="text-2xl font-bold mb-2">
                        {property.measurement} {property.measurement > 1
                            ? property.unit === "marla"
                                ? "Marlas"
                                : "Kanals"
                            : property.unit === "marla"
                                ? "Marla"
                                : "Kanal"}{" "}
                        House for {property.type.charAt(0).toUpperCase() + property.type.slice(1)} in {property.location}
                    </h3>

                    <h3 className="text-2xl font-bold mb-2">
                        PKR : {property?.price}
                    </h3>

                    <p >
                        Looking for a well-designed home in a prime area like {property.location}? This {property.measurement}{" "}
                        {property.unit} property is ideal for affordability, style, and comfort.
                    </p>

                    <ul className="space-y-2">
                        <li><span className="font-semibold">Rooms:</span> {property.rooms} {property.rooms > 1 ? "Rooms" : "Room"} </li>
                        <li><span className="font-semibold">Baths:</span> {property.bath} {property.bath > 1 ? "Baths" : "Bath"}</li>
                        <li><span className="font-semibold">Front:</span> {property.front} ft</li>
                        <li><span className="font-semibold">Back:</span> {property.back} ft</li>
                        <li><span className="font-semibold">Location:</span> {property.location}</li>
                    </ul>
                    <h2 className="text-xl font-semibold mt-2">Description</h2>
                    <p >{property.description}</p>
                </div>

                {/* Only show these if the property is sold */}
                {property.soldout == true && (

                    <div className="space-y-[5px]">

                        <p className="pp mt-[20px] text-[30px]">Deal Information:</p>
                        <div className="flex gap-[5px]   ">
                            <p className="pp">
                                <span className="font-semibold">Sold At:</span>{" "}
                                {new Date(property.soldAt).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </p>

                        </div>

                        <div className="flex gap-[5px]   ">
                            <p className="pp"><span className="font-semibold">Sold By Us:</span> {property.soldByUs ? "Yes" : "No"}</p>
                        </div>

                        {property.soldByUs == true && (
                            <>
                                <div className="flex gap-[5px]   ">
                                    <p className="pp"><span className="font-semibold">Buyer:</span> {property.buyerName || "N/A"}</p>
                                </div>

                                <div className="flex gap-[5px]   ">
                                    <p className="pp"><span className="font-semibold">Seller:</span> {property.sellerName || "N/A"}</p>
                                </div>

                                <div className="flex gap-[5px]   ">
                                    <p className="pp"><span className="font-semibold">Commission:</span> PKR {property.commission || 0}</p>
                                </div>
                            </>
                        )}
                    </div>
                )}


                {property.soldout == false && (
                    <div className="flex gap-[5px] mt-[20px]">
                        <button className="btn3"><Link to={`/editproperty/${property.id}`}>Edit the Property</Link></button>
                        {/* <button className="btn3">Mark as Sold</button> */}
                        <button className="btn3" onClick={() => setOpenDialog(true)}>Mark as Sold</button>

                    </div>
                )}
                {property.soldout == true && (
                    <div className=" mt-[20px]">
                        <button className="btn3 !w-full"><Link to={`/editproperty/${property.id}`}>Edit the Property</Link></button>
                    </div>
                )}
                <button onClick={handleDelete} className="btn3 !bg-red-600 hover:!bg-red-700 !w-full mt-[5px]">Delete Property</button>
                <Modal
                    isOpen={openDialog}
                    onRequestClose={() => setOpenDialog(false)}
                    contentLabel="Mark as Sold"
                    className="bg-white p-6 max-w-lg w-full mx-auto mt-20 rounded shadow-md relative z-[1000]"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-[999]"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Mark as Sold</h2>
                        <button onClick={() => setOpenDialog(false)}>
                            <RxCross1 />
                        </button>
                    </div>

                    <form onSubmit={markAsSold} className="space-y-4">
                        <label className="flex items-center gap-2">
                            Sold By Us
                            <input
                                type="checkbox"
                                name="soldByUs"
                                className="w-[20px]"
                                checked={soldForm.soldByUs}
                                onChange={handleInputChange}
                            />
                        </label>

                        <input
                            type="date"
                            name="soldAt"
                            value={soldForm.soldAt}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                            required
                        />

                        {soldForm.soldByUs == true && (
                            <div>
                                <input
                                    type="text"
                                    name="buyerName"
                                    placeholder="Buyer Name"
                                    value={soldForm.buyerName}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="sellerName"
                                    placeholder="Seller Name"
                                    value={soldForm.sellerName}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />

                                <input
                                    type="number"
                                    name="commission"
                                    placeholder="Commission Amount"
                                    value={soldForm.commission}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                        >
                            Confirm Mark as Sold
                        </button>
                    </form>

                </Modal>

            </section>
        </div>
    );
}
