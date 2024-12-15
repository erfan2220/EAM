import { useParams } from 'react-router-dom';

const WelcomePage = () => {
    const { name } = useParams();
    return <div className="text-[40px] h-[calc(100vh-150px)] flex justify-center items-center">
                 Welcome, {name}!
            </div>;
}

export default WelcomePage;