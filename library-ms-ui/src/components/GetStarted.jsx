import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  let navigate=useNavigate();
    return (
      <div className="bg-gradient-to-r from-teal-500 to-green-400 mb-2 py-16 px-10 text-center rounded-lg shadow-xl">
        <h2 className="text-4xl font-extrabold text-white mb-6">Your Next Book Is Just One Click Away</h2>
        <p className="text-lg text-gray-100 mb-8">Unlock a vast collection of books, keep track of your reading history, and enjoy our community reviews. Let's get started!</p>
        <div className="flex justify-center gap-6">
          {/* Sign Up Button */}
          <button onClick={()=> navigate('/signup')} className="bg-yellow-500 text-white py-3 px-10 rounded-lg text-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Sign Up
          </button> 
  
          {/* Explore Now Button */}
          <button onClick={()=> navigate('/login')} className="bg-purple-600 text-white py-3 px-10 rounded-lg text-lg hover:bg-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Explore Now
          </button>
        </div>
      </div>
    );
  };
  
  export default GetStarted;
  