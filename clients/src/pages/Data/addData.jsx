// import { useState } from "react";
// import { tambahPlayer, uploadPhoto } from "../services/service";

export default function AddData({ }) {
//   const [form, setForm] = useState({
//     name: "",
//     position: "",
//     teams: "",
//   });

//   const [photo, setPhoto] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const ok = confirm("Yakin mau menambahkan player?");
//     if (!ok) return;

//     try {
//       let photoUrl = null;

//       if (photo && photo.size > 2_000_000) {
//         alert("Foto maksimal 2MB");
//         return;
//       }

//       if (photo) {
//         photoUrl = await uploadPhoto(photo);
//       }

//       await tambahPlayer({
//         ...form,
//         photo: photoUrl,
//       });

//       onSuccess();
//     } catch (err) {
//       alert(err.message);
//       console.error(err);
//     }
//   };

  return (
    <>
    <div className="box"></div>
    <div className="data" style={{margin: '10px',alignItems: 'center', justifyContent:'center'}}>
     <h1>Judul</h1>
     <input type="text" />
     <h1>deskripsi/sinopsis</h1>
     <input type="text" />
     <h1>Genre</h1>
     <input type="text" />
     <h1>image</h1>
     <input type="file" />
     <h1>Tahun</h1>
     <input type="date" />
    </div>
    </>
  );
}