import { Navbar, Footer, Banner, TestimonialCard } from '../../components';
import { Link } from 'react-router-dom';
import { testimonials } from '../../constants';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';


const Testimonials = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try{
        // const userId = uuidv4();
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data()});
        });
        setData(list);
        console.log(list);
      } catch(err){
        console.log(err);
      }
    };
    fetchData()
  }, []);

  console.log(data);
  return (
    <div>
      <header>
        <Navbar />
        <Banner />
      </header>

      <main className="px-24 py-20">
        <section className="flex flex-col items-center mx-auto xl:w-11/12">
          <Link className="btn-testimonial mb-14" to="/testimonials/input">
            <p>Share your thought here...</p>
          </Link>

          <div className="flex flex-col gap-y-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
          <div>
          {data.map((item, index) => (
            <div key={index}>{JSON.stringify(item)}</div>
          ))}
          </div>
          
        </section>
      </main>

      <Footer />
    </div>
  );

// const Testimonials = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       let list = [];
//       try {
//         const userId = uuidv4(); // contoh UUID pengguna
//         const querySnapshot = await getDocs(collection(db, "users", userId, "testimonials"));
//         querySnapshot.forEach((doc) => {
//           list.push(doc.data());
//         });
//         setData(list);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);

//   console.log(data);
  // return (
  //   <div>
  //     <header>
  //       <Navbar />
  //       <Banner />
  //     </header>

  //     <main className="px-24 py-20">
  //       <section className="flex flex-col items-center mx-auto xl:w-11/12">
  //         <Link className="btn-testimonial mb-14" to="/testimonials/input">
  //           <p>Share your thought here...</p>
  //         </Link>

  //         <div className="flex flex-col gap-y-4">
  //           {testimonials.map((testimonial, index) => (
  //             <TestimonialCard key={index} testimonial={testimonial} />
  //           ))}
  //         </div>
  //         <div>
  //         {data.map((item, index) => (
  //           <div key={index}>{JSON.stringify(item)}</div>
  //         ))}
  //         </div>
          
  //       </section>
  //     </main>

  //     <Footer />
  //   </div>
  // );

  // return (
    // <div>
    //   {data.map((item, index) => (
    //     <div key={index}>{JSON.stringify(item)}</div>
    //   ))}
    // </div>
  // );
};

export default Testimonials;
