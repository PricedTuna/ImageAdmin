import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <button
          className="px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors"
          onClick={() => navigate('/sections')}
        >
          Secciones
        </button>
        <button
          className="px-4 py-2 font-semibold text-white bg-green-500 hover:bg-green-600 rounded transition-colors"
          onClick={() => navigate('/albums')}
        >
          Álbumes
        </button>
      </div>
    </div>
  );
}

export default Home
