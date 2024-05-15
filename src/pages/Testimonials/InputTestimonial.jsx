// import { useState, useEffect } from 'react';
// import { Navbar, Banner, Footer, DropdownProduct } from '../../components';
// import { starBlueEmpty, starBlueFill } from '../../assets';
// // import { db } from '../../firebase';
// import { onValue, ref, set } from 'firebase/database';
// import { uid } from "uid";
// import { database } from '../../firebase';

// function InputTestimonial() {
//   const [rating, setRating] = useState(0);
//   const handleRating = (index) => setRating(index + 1);

//   const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState([]);

//   const handleTodoChange = (e) => {
//     setTodo(e.target.value)
//   };

//   // read
//   useEffect(() => {
//     onValue(ref(database), snapShot => {
//       const data = snapShot.val();
//       if(data !== null){
//         Object.values(data).map((todo) => {
//           setTodos((oldArray) => [...oldArray, todo]);
//         });
//       }
//     });
//   }, []);

//   const writeToDatabase = () => {
//     const uuid = uid();
//     set(ref(database, `/${uuid}`), {
//       todo,
//       uuid,
//     });

//     setTodo("");
//   };
  

//   return (
//     <div>
//       <header>
//         <Navbar />
//         <Banner showBackButton previousPage="/testimonials" />
//       </header>

//       <main className="px-24 py-20">
//         <section className=" mx-auto xl:w-11/12">
//           <form
//             action="/testimonials"
//             className="flex flex-col items-center gap-y-10"
//           >
//             <DropdownProduct />

//             <div className="flex gap-2">
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <button
//                   key={index}
//                   className="btn-rating w-14"
//                   onClick={() => handleRating(index)}
//                   type="button"
                  
//                 >
//                   <img
//                     alt="Star"
//                     src={index < rating ? starBlueFill : starBlueEmpty}
//                   />
//                 </button>
//               ))}
//             </div>


//             {/* <input
//               className="textarea-field mt-3"
//               placeholder="Share your thought here..."
//               type="text"
//               value={todo}
//               onChange={handleTodoChange}> 
//             </input> */}
//             <textarea
//               className="textarea-field mt-3"
//               placeholder="Share your thought here..."
//               type="text"
//               value={todo}
//               onChange={handleTodoChange}
//             ></textarea>


//             <div className="flex justify-end xl:w-10/12">
//               <button 
//                 className="btn--pink-primary" 
//                 type="submit"
//                 onClick={writeToDatabase}>
//                 Send
//               </button>
//               {todos.map((todo) => (
//                 <>
//                 <h1>{todo.todo}</h1>
//                 </>
//               ))}
//             </div>
//           </form>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// // const InputTestimonial = () => {
  
// // };

// export default InputTestimonial;



import { useState } from 'react';
import { Navbar, Banner, Footer, DropdownProduct } from '../../components';
import { starBlueEmpty, starBlueFill } from '../../assets';
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { auth, db } from '../../firebase';
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { userInputs } from '../../formSource';
import { v4 as uuidv4 } from 'uuid';

const InputTestimonial = ({Inputs}) => {
  const [rating, setRating] = useState(0);
  const handleRating = (index) => setRating(index + 1);
  const [data, setData] = useState({})

  const handleInput = (e) =>{
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]:value });
  };

  console.log(data);

  const handleAdd = async(e) =>{
    e.preventDefault();
    try{
      // const res = await createUserWithEmailAndPassword(
      //   auth,
      //   data.email,
      //   data.password
      // );
    //   const res = await setDoc(doc(db, "users"), {
    //     ...data,
    //     timeStamp: serverTimestamp()
    //   });
    // } catch(err){
    //   console.log(err);
    const userId = uuidv4();
    const res = await setDoc(doc(db, "users", userId), {
      ...data,
      timeStamp: serverTimestamp()
    });
    console.log('user add success', res);
    } catch (err) {
      console.error('error adding user', err);
    }

  };

  return (
    <div>
      <header>
        <Navbar />
        <Banner showBackButton previousPage="/testimonials" />
      </header>

      <main className="px-24 py-20">
        <section className=" mx-auto xl:w-11/12">
          <form
            action="/testimonials"
            className="flex flex-col items-center gap-y-10"
            onSubmit={handleAdd}
          >
            <DropdownProduct />

            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <button
                  key={index}
                  className="btn-rating w-14"
                  onClick={() => handleRating(index)}
                  type="button"
                >
                  <img
                    alt="Star"
                    src={index < rating ? starBlueFill : starBlueEmpty}
                  />
                </button>
              ))}
            </div>

            {userInputs.map((textarea) => (
              <textarea
              className="textarea-field mt-3"
              placeholder="Share your thought here..."
              key={textarea.id}
              
              onChange={handleInput}
              id={textarea.id}
            ></textarea>
            ))}
            
            

            <div className="flex justify-end xl:w-10/12">
              <button className="btn--pink-primary" type="submit">
                Send
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InputTestimonial;

