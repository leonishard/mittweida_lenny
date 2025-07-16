import React from 'react';
import { Route, Switch } from 'wouter'; // ✅ Changed from react-router-dom to wouter
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import History from './pages/history/History';
import Food from './pages/food/Food';
import WeatherPage from "./pages/weather/WeatherPage.tsx";
import Mapview from "./pages/map/Mapview.tsx";
import Login from "./components/Login";
import Profile from "./pages/Profile/Profile";
import { AuthProvider } from "./components/AuthContext.tsx";

const App: React.FC = () => {
    return (
        <AuthProvider>
            {/* ✅ No Router wrapper needed with wouter */}
            <Navbar />
            <div>
                <Switch> {/* ✅ Switch instead of Routes */}
                    <Route path="/map" component={Mapview} />
                    <Route path="/" component={Home} />
                    <Route path="/history" component={History} />
                    <Route path="/food" component={Food} />
                    <Route path="/weather" component={WeatherPage} /> {/* ✅ Fixed case sensitivity */}
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={Profile} />

                    {/* ✅ 404 catch-all route (optional) */}
                    <Route>
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <h2>404 - Page Not Found</h2>
                            <p>The page you're looking for doesn't exist.</p>
                        </div>
                    </Route>
                </Switch>
            </div>
        </AuthProvider>
    );
};

export default App;