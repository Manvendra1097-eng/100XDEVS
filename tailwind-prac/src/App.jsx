import './App.css';

function App() {
  return (
    <>
      {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ backgroundColor: 'red' }}>Hi</div>
        <div style={{ backgroundColor: 'green' }}>Hi</div>
        <div style={{ backgroundColor: 'orangered' }}>Hi</div>
      </div> */}

      {/* <div className="flex justify-around">
        <div className="bg-red-700">Hi</div>
        <div className="bg-green-700">Hi</div>
        <div className="bg-yellow-700">Hi</div>
      </div> */}

      <div className="grid grid-cols-2 md:grid-cols-3">
        <div className="bg-red-700">Hi</div>
        <div className="bg-green-700">Hi</div>
        <div className="bg-yellow-700">Hi</div>
        <div className="bg-purple-700">Hi</div>
      </div>
    </>
  );
}

export default App;
