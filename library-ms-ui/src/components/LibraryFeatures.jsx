import { Navigate, useNavigate } from "react-router-dom";

const LibraryFeatures = () => {

  let navigate=useNavigate();
    return (
      <div className="bg-gray-50 py-16 px-10">
        <h2 className="text-4xl font-semibold text-center mb-12 text-teal-600">Library Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Book Search */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-300 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center">
            <h3 className="text-2xl font-semibold mb-4 text-white">Book Search</h3>
            <p className="text-gray-200 mb-4">Find any book in our vast collection with just a few clicks.</p>
            <button onClick={()=> navigate('/login')} className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-500 transition duration-300">
              Search Now
            </button>
          </div>
  
          {/* Reading History */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center">
            <h3 className="text-2xl font-semibold mb-4 text-white">Reading History</h3>
            <p className="text-gray-800 mb-4">Keep track of all the books you've borrowed and read over time.</p>
            <button onClick={()=> navigate('/login')}  className="bg-yellow-600 text-white py-2 px-6 rounded-lg hover:bg-yellow-500 transition duration-300">
              View History
            </button>
          </div>
  
          {/* User Reviews */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center">
  <h3 className="text-2xl font-semibold mb-4 text-white">Library Services</h3>
  <p className="text-gray-200 mb-4">Manage your borrowed books, check due dates, and explore the catalog effortlessly.</p>
  <div className="flex justify-center gap-4 mt-4">
    <button onClick={()=> navigate('/login')} className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300">
      Borrowed Books
    </button>
    
  </div>
</div>

        </div>
      </div>
    );
  };
  
  export default LibraryFeatures;
  