import { useState, useEffect } from "react";
import TextBox from "../components/TextBox";
import DialogBox from "../components/DialogBox";
import background from "../assets/background-no-one.png";
import chara1Image from "../assets/chara-no-one.png";
import chara1ImageB from "../assets/chara-no-one-b.png";
import chara2Image from "../assets/chara-no-three.png";
import tutorialVideo from "../assets/tutorial-video.gif";
import { motion } from "framer-motion";
import LoadingScreen from "../components/LoadingScreen";

const NoOne = () => {
   const [count, setCount] = useState(0);
   const [choices, setChoices] = useState(false);
   const [showTutorialVideo, setShowTutorialVideo] = useState(false);
   const [chara2Visible, setChara2Visible] = useState(false);
   const [chara1Visible, setChara1Visible] = useState(true);
   const [chara1BVisible, setChara1BVisible] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   const texts1 = [
      "Hi :)",
      "Dengerin yaa",
      "Wesley....",
      "Hari ini aku tiba tiba kerasa kelupaan sesuatu",
      "Tapi aku coba inget terus tapi tetep aja ga bisa ingat", 
      "Kamu bisa bantuin gak",
      "ada ide aku kelupaan apa gak?",
   ];

   const texts2 = [
      "Etss, kamu gak tau juga?",
      "yahh coba aku inget inget lagi deh",
      "Kamu beneran gak ada ide?",
      "!!!!!!!!!",
      "Aku tiba tiba inget~~",
      "Kamu inget gak hari ini hari apa?",
   ];


   const handleIncrement = () => {
      if (showTutorialVideo) {
         if (count >= 2) {
            setChara1BVisible(true);
            setChara1Visible(false);
         }
         if (count >= texts2.length - 1) {
            setShowTutorialVideo(true);
         } else {
            setCount(count + 1);
         }
      } else {
         if (count >= texts1.length - 1) {
            setChoices(true);
         } else {
            setCount(count + 1);
         }
      }
   };

   const handleDecrement = () => {
      if (count <= 0) {
         return;
      }
      if (texts1[count] === texts2) {
         return;
      }
      setCount(count - 1);
   };

   const handleTutorialVideo = () => {
      setChoices(false);
      setChara1Visible(false);
      setChara2Visible(true);
      setCount(0);
      setShowTutorialVideo(true);
   };

   return (
      <>
         {isLoading && <LoadingScreen />}
         {showTutorialVideo ? (
            <div className="w-auto md:h-1/2 absolute z-0 left-1/2 top-[60dvw] md:top-[40dvh] transform -translate-x-1/2 -translate-y-1/2">
               {count === 5 && (
                  <div className="mx-10 my-[10dvh] md:my-[20dvh]">
                     <div
                        className=" text-pink-900 quicksand-bold  active:bg-pink-700/50 shadow py-1 px-4 mt-1 md:py-4 cursor-pointer text-center
                        border-[2px] border-pink-900
                        rounded-xl bg-pink-200 bg-opacity-[95%]
                        hover:bg-pink-900 hover:text-white hover:scale-105 transition-all duration-200"
                        onClick={() => (window.location.href = "/good-ending")}
                     >
                        ULANG TAHUN WESLEY
                     </div>
                     <div
                        className=" text-pink-900 quicksand-bold shadow py-1 px-4 mt-1 md:py-4 cursor-pointer text-center
                           border-[2px] border-pink-900
                           rounded-xl bg-pink-200 bg-opacity-[95%]
                           hover:bg-pink-900 hover:text-white hover:scale-105 transition-all duration-200"
                        onClick={() => (window.location.href = "/good-ending")}
                     >
                        Kayaknya ada ide deh
                     </div>
                  </div>
               )}
            </div>
         ) : (
            <></>
         )}
         <img
            src={background}
            alt="background"
            className="h-dvh object-cover md:w-screen z-[-2] absolute top-0 left-0"
            onLoad={() => setIsLoading(false)}
         />
         {chara1BVisible && !chara2Visible && (
            <motion.img
               src={chara1ImageB}
               alt="chara"
               className="h-[50vh] md:h-[90vh] absolute bottom-[20vh] md:bottom-0 md:right-[20vw] z-[-1]"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1 }}
            />
         )}
         {chara1Visible && !chara2Visible && (
            <motion.img
               src={chara1Image}
               alt="chara"
               className="h-[85vh] md:h-[94vh] absolute bottom-0 md:right-[57vw] z-[-1]"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 1 }}
            />
         )}

         {chara2Visible && (
            <motion.img
               src={chara2Image}
               alt="chara"
               className="h-[85vh] md:h-[94vh] absolute bottom-[1vw] md:right-[57vw] z-[-1]"
               key={count}
               animate={{ transform: "translateY(1vw)" }}
               transition={{ duration: 0.2 }}
            />
         )}

         <motion.div
            className="h-dvh w-screen items-center justify-start gap-8 flex flex-col-reverse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
         >
            <TextBox
               texts={showTutorialVideo ? texts2 : texts1}
               count={count}
            />

            <DialogBox
               handleIncrement={handleIncrement}
               handleDecrement={handleDecrement}
               style={{ zIndex: 10 }}
            />
            {!showTutorialVideo && choices && (
               <div className="mx-10 my-[10dvh] md:my-[20dvh]">
                  <div
                     className=" text-pink-900 quicksand-bold  active:bg-pink-700/50 shadow py-1 px-16 mt-1 md:py-4 cursor-pointer text-center
                     border-[2px] border-pink-900
                     rounded-xl bg-pink-200 bg-opacity-[95%]
                     hover:bg-pink-900 hover:text-white hover:scale-105 transition-all duration-200"
                  >
                     <a
                        href="/good-ending"
                        className="block w-full h-full text-center" // Set the anchor tag to be block-level and cover the entire parent div
                     >
                        ulang tahun orang gak sih? 
                     </a>
                  </div>
                  <div
                     className=" text-pink-900 quicksand-bold shadow py-1 px-4 mt-1 md:py-4 cursor-pointer text-center
                           border-[2px] border-pink-900
                           rounded-xl bg-pink-200 bg-opacity-[95%]
                           hover:bg-pink-900 hover:text-white hover:scale-105 transition-all duration-200"
                  >
                     <a
                        onClick={handleTutorialVideo} // Change handleBlueScreen to handleTutorialVideo
                        className="block w-full h-full text-center" // Set the anchor tag to be block-level and cover the entire parent div
                     >
                        Masih agak lupa
                     </a>
                  </div>
               </div>
            )}
         </motion.div>
      </>
   );
};

export default NoOne;
