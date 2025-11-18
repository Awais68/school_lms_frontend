import React, { useState, useEffect } from "react";
import { Card } from "../components/ui";

const TransportManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  // const [students, setStudents] = useState([]);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [newRoute, setNewRoute] = useState({
    name: "",
    origin: "",
    destination: "",
    stops: [],
    operationalDays: [],
    estimatedDuration: "",
    fare: "",
    branchId: "",
  });
  const [newVehicle, setNewVehicle] = useState({
    registrationNumber: "",
    model: "",
    manufacturer: "",
    year: new Date().getFullYear(),
    capacity: "",
    fuelType: "diesel",
    driver: "",
    branchId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
    fetchVehicles();
    fetchDrivers();
    fetchStudents();
  }, []);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/transport/routes');
      // setRoutes(response.data.data.routes);

      // For demo purposes, using dummy data
      const dummyRoutes = [
        {
          _id: 1,
          name: "North Route",
          origin: "City Center",
          destination: "School Campus",
          stops: ["Central Park", "Shopping Mall", "University"],
          operationalDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          estimatedDuration: 45,
          fare: 50,
          vehicles: 2,
          activeStudents: 45,
        },
        {
          _id: 2,
          name: "South Route",
          origin: "Downtown",
          destination: "School Campus",
          stops: ["Main Street", "Hospital", "Library"],
          operationalDays: ["Monday", "Wednesday", "Friday"],
          estimatedDuration: 35,
          fare: 40,
          vehicles: 1,
          activeStudents: 28,
        },
      ];
      setRoutes(dummyRoutes);
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/transport/vehicles');
      // setVehicles(response.data.data.vehicles);

      // For demo purposes, using dummy data
      const dummyVehicles = [
        {
          _id: 1,
          registrationNumber: "ABC-1234",
          model: "School Bus",
          manufacturer: "Tata",
          year: 2020,
          capacity: 25,
          fuelType: "diesel",
          driver: { firstName: "John", lastName: "Doe" },
          branch: "Main Campus",
          status: "Active",
        },
        {
          _id: 2,
          registrationNumber: "XYZ-5678",
          model: "School Van",
          manufacturer: "Mahindra",
          year: 2019,
          capacity: 15,
          fuelType: "petrol",
          driver: { firstName: "Mike", lastName: "Johnson" },
          branch: "Main Campus",
          status: "Active",
        },
      ];
      setVehicles(dummyVehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const fetchDrivers = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/users?role=driver');
      // setDrivers(response.data.data.users);

      // For demo purposes, using dummy data
      setDrivers([
        { _id: 1, firstName: "John", lastName: "Doe", phone: "+1234567890" },
        {
          _id: 2,
          firstName: "Mike",
          lastName: "Johnson",
          phone: "+1234567891",
        },
        {
          _id: 3,
          firstName: "Robert",
          lastName: "Smith",
          phone: "+1234567892",
        },
      ]);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/users?type=student');
      // setStudents(response.data.data.users);
      // For demo purposes, using dummy data - students state commented out
      // setStudents([
      //   { _id: 1, firstName: 'Alice', lastName: 'Johnson', rollNumber: '1', studentId: 'STU-001' },
      //   { _id: 2, firstName: 'Bob', lastName: 'Smith', rollNumber: '2', studentId: 'STU-002' },
      //   { _id: 3, firstName: 'Charlie', lastName: 'Brown', rollNumber: '3', studentId: 'STU-003' }
      // ]);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const createRoute = async () => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post('/transport/routes', newRoute);

      const route = {
        _id: routes.length + 1,
        ...newRoute,
        vehicles: 0,
        activeStudents: 0,
      };

      setRoutes([...routes, route]);
      setShowRouteModal(false);
      setNewRoute({
        name: "",
        origin: "",
        destination: "",
        stops: [],
        operationalDays: [],
        estimatedDuration: "",
        fare: "",
        branchId: "",
      });
      alert("Route created successfully!");
    } catch (error) {
      console.error("Error creating route:", error);
      alert("Error creating route. Please try again.");
    }
  };

  const createVehicle = async () => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post('/transport/vehicles', newVehicle);

      const vehicle = {
        _id: vehicles.length + 1,
        ...newVehicle,
        driver: drivers.find((d) => d._id === newVehicle.driver) || {
          firstName: "Unknown",
          lastName: "Driver",
        },
        branch: "Main Campus", // In real, would come from backend
        status: "Active",
      };

      setVehicles([...vehicles, vehicle]);
      setShowVehicleModal(false);
      setNewVehicle({
        registrationNumber: "",
        model: "",
        manufacturer: "",
        year: new Date().getFullYear(),
        capacity: "",
        fuelType: "diesel",
        driver: "",
        branchId: "",
      });
      alert("Vehicle added successfully!");
    } catch (error) {
      console.error("Error creating vehicle:", error);
      alert("Error adding vehicle. Please try again.");
    }
  };

  const handleOperationalDayToggle = (day) => {
    setNewRoute((prev) => {
      const currentDays = [...prev.operationalDays];
      if (currentDays.includes(day)) {
        return {
          ...prev,
          operationalDays: currentDays.filter((d) => d !== day),
        };
      } else {
        return {
          ...prev,
          operationalDays: [...currentDays, day],
        };
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Transport Management
        </h1>
        <p className="text-gray-600">
          Manage routes, vehicles, and student transportation
        </p>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Transport Overview</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowRouteModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Route
            </button>
            <button
              onClick={() => setShowVehicleModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Add Vehicle
            </button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Routes</h3>
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {routes.map((route) => (
                <div
                  key={route._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{route.name}</h4>
                      <p className="text-sm text-gray-600">
                        {route.origin} to {route.destination}
                      </p>
                      <p className="text-sm text-gray-600">
                        {route.stops.join(", ")}
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{route.estimatedDuration} min</span>
                    <span>₹{route.fare}</span>
                    <span>{route.activeStudents} students</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Vehicles</h3>
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        {vehicle.registrationNumber}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {vehicle.model} by {vehicle.manufacturer}
                      </p>
                      <p className="text-sm text-gray-600">
                        Driver: {vehicle.driver.firstName}{" "}
                        {vehicle.driver.lastName}
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{vehicle.capacity} seats</span>
                    <span>{vehicle.fuelType}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        vehicle.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Add Route Modal */}
      {showRouteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Add New Route</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Route Name
                </label>
                <input
                  type="text"
                  value={newRoute.name}
                  onChange={(e) =>
                    setNewRoute({ ...newRoute, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter route name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origin
                </label>
                <input
                  type="text"
                  value={newRoute.origin}
                  onChange={(e) =>
                    setNewRoute({ ...newRoute, origin: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter origin location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  value={newRoute.destination}
                  onChange={(e) =>
                    setNewRoute({ ...newRoute, destination: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter destination location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Duration (min)
                </label>
                <input
                  type="number"
                  value={newRoute.estimatedDuration}
                  onChange={(e) =>
                    setNewRoute({
                      ...newRoute,
                      estimatedDuration: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter duration in minutes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fare
                </label>
                <input
                  type="number"
                  value={newRoute.fare}
                  onChange={(e) =>
                    setNewRoute({ ...newRoute, fare: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter fare amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch
                </label>
                <input
                  type="text"
                  value={newRoute.branchId}
                  onChange={(e) =>
                    setNewRoute({ ...newRoute, branchId: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter branch ID"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stops
                </label>
                <textarea
                  value={newRoute.stops.join("\n")}
                  onChange={(e) =>
                    setNewRoute({
                      ...newRoute,
                      stops: e.target.value
                        .split("\n")
                        .filter((stop) => stop.trim()),
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter stops separated by new lines"
                  rows="3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operational Days
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newRoute.operationalDays.includes(day)}
                        onChange={() => handleOperationalDayToggle(day)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowRouteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createRoute}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Route
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showVehicleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Add New Vehicle</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={newVehicle.registrationNumber}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      registrationNumber: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter registration number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  value={newVehicle.model}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, model: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter vehicle model"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturer
                </label>
                <input
                  type="text"
                  value={newVehicle.manufacturer}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      manufacturer: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter manufacturer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  value={newVehicle.year}
                  onChange={(e) =>
                    setNewVehicle({
                      ...newVehicle,
                      year: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter year"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  value={newVehicle.capacity}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, capacity: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter capacity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  value={newVehicle.fuelType}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, fuelType: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="diesel">Diesel</option>
                  <option value="petrol">Petrol</option>
                  <option value="electric">Electric</option>
                  <option value="cng">CNG</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Driver
                </label>
                <select
                  value={newVehicle.driver}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, driver: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Driver</option>
                  {drivers.map((driver) => (
                    <option key={driver._id} value={driver._id}>
                      {driver.firstName} {driver.lastName} ({driver.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch
                </label>
                <input
                  type="text"
                  value={newVehicle.branchId}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, branchId: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter branch ID"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowVehicleModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createVehicle}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportManagement;
