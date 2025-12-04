import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home.jsx';
import { Login } from '../pages/Auth/Login.jsx';
import { Register } from '../pages/Auth/Register.jsx';
import { Logout } from '../pages/Auth/Logout.jsx';
import { Catalog } from '../pages/Events/Catalog.jsx';
import { EventDetails } from '../pages/Events/EventDetails.jsx';
import { CreateEvent } from '../pages/Events/CreateEvent.jsx';
import { EditEvent } from '../pages/Events/EditEvent.jsx';
import { MyEvents } from '../pages/Events/MyEvents.jsx';
import { NotFound } from '../pages/NotFound.jsx';
import { PrivateRoute } from '../components/RouteGuards/PrivateRoute.jsx';
import { GuestRoute } from '../components/RouteGuards/GuestRoute.jsx';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      <Route path="/events" element={<Catalog />} />
      <Route path="/events/:eventId" element={<EventDetails />} />

      <Route
        path="/events/create"
        element={
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        }
      />
      <Route
        path="/events/:eventId/edit"
        element={
          <PrivateRoute>
            <EditEvent />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-events"
        element={
          <PrivateRoute>
            <MyEvents />
          </PrivateRoute>
        }
      />

      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}