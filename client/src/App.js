import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateTask } from "./pages/create-task";
import { CompletedTasks } from "./pages/completed-tasks";
import { DailyTasks } from "./pages/daily-tasks";
import { Navbar } from "./pages/navbar";

function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/completed-tasks" element={<CompletedTasks />} />
                <Route path="/daily-tasks" element={<DailyTasks />} />
            </Routes>
        </BrowserRouter>
    </div>
    );
}

export default App;