import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    sku: '',
    description: '',
    quantity: 0,
    unit: 'pcs',
    unitPrice: 0,
    supplier: '',
    location: '',
    minStockLevel: 5,
    branchId: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
    fetchBranches();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/inventory');
      // setInventory(response.data.data.inventoryItems);
      
      // For demo purposes, using dummy data
      const dummyInventory = [
        {
          _id: 1,
          name: 'Geometry Set',
          category: 'Stationery',
          sku: 'STA-GEOM-001',
          description: 'Complete geometry set with compass, protractor, and rulers',
          quantity: 45,
          unit: 'pcs',
          unitPrice: 150,
          totalValue: 6750,
          supplier: { firstName: 'ABC', lastName: 'Stationery' },
          location: 'Stationery Store Room',
          minStockLevel: 10,
          branch: { name: 'Main Campus' },
          status: 'available'
        },
        {
          _id: 2,
          name: 'Mathematics Textbook Grade 8',
          category: 'Books',
          sku: 'BKS-MATH8-001',
          description: 'Mathematics textbook for Grade 8 students',
          quantity: 20,
          unit: 'pcs',
          unitPrice: 300,
          totalValue: 6000,
          supplier: { firstName: 'Education', lastName: 'Publishers' },
          location: 'Library',
          minStockLevel: 15,
          branch: { name: 'Main Campus' },
          status: 'available'
        },
        {
          _id: 3,
          name: 'Lab Beakers Set',
          category: 'Laboratory',
          sku: 'LAB-BEAK-001',
          description: 'Set of 10 lab beakers of various sizes',
          quantity: 8,
          unit: 'pcs',
          unitPrice: 800,
          totalValue: 6400,
          supplier: { firstName: 'Science', lastName: 'Equipments' },
          location: 'Chemistry Lab',
          minStockLevel: 5,
          branch: { name: 'Main Campus' },
          status: 'available'
        }
      ];
      setInventory(dummyInventory);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      // In a real implementation, this would fetch from the backend
      // const response = await api.get('/branches');
      // setBranches(response.data.data.branches);
      
      // For demo purposes, using dummy data
      setBranches([
        { _id: 1, name: 'Main Campus' },
        { _id: 2, name: 'East Campus' },
        { _id: 3, name: 'West Campus' }
      ]);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const createItem = async () => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post('/inventory', newItem);
      
      const item = {
        _id: inventory.length + 1,
        ...newItem,
        totalValue: newItem.quantity * newItem.unitPrice,
        supplier: { firstName: 'Unknown', lastName: 'Supplier' }, // In real, would come from backend
        branch: branches.find(b => b._id === newItem.branchId) || { name: 'Unknown Branch' },
        status: newItem.quantity > 0 ? 'available' : 'empty'
      };
      
      setInventory([...inventory, item]);
      setShowCreateModal(false);
      setNewItem({
        name: '',
        category: '',
        sku: '',
        description: '',
        quantity: 0,
        unit: 'pcs',
        unitPrice: 0,
        supplier: '',
        location: '',
        minStockLevel: 5,
        branchId: ''
      });
      alert('Inventory item added successfully!');
    } catch (error) {
      console.error('Error creating inventory item:', error);
      alert('Error adding inventory item. Please try again.');
    }
  };

  const updateStock = async (itemId, quantityChange) => {
    try {
      // In a real implementation, this would send to the backend
      // await api.post(`/inventory/${itemId}/stock-update`, { quantityChange, reason: 'Manual update' });
      
      setInventory(prev => prev.map(item => 
        item._id === itemId 
          ? { 
              ...item, 
              quantity: Math.max(0, item.quantity + quantityChange),
              totalValue: (Math.max(0, item.quantity + quantityChange)) * item.unitPrice,
              status: Math.max(0, item.quantity + quantityChange) > 0 ? 'available' : 'empty'
            } 
          : item
      ));
      alert(quantityChange >= 0 ? 'Stock increased successfully!' : 'Stock decreased successfully!');
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Error updating stock. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-600">Manage school inventory and supplies</p>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Inventory Items</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Item
          </button>
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventory.map((item) => (
                  <tr key={item._id} className={item.quantity < item.minStockLevel ? 'bg-yellow-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{item.quantity} {item.unit}</span>
                        <div className="ml-2 w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.quantity < item.minStockLevel 
                                ? 'bg-red-600' 
                                : item.quantity < item.minStockLevel * 2 
                                  ? 'bg-yellow-500' 
                                  : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(100, (item.quantity / item.minStockLevel) * 20)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">Min: {item.minStockLevel}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{item.unitPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{item.totalValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => updateStock(item._id, 1)}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        +1
                      </button>
                      <button 
                        onClick={() => updateStock(item._id, -1)}
                        className="text-red-600 hover:text-red-900 mr-2"
                      >
                        -1
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add Item Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Inventory Item</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter item name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter category"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  value={newItem.sku}
                  onChange={(e) => setNewItem({...newItem, sku: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter SKU"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  value={newItem.unit}
                  onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="pcs">Pieces</option>
                  <option value="kg">Kilograms</option>
                  <option value="liters">Liters</option>
                  <option value="sets">Sets</option>
                  <option value="boxes">Boxes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter quantity"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price (₹)</label>
                <input
                  type="number"
                  value={newItem.unitPrice}
                  onChange={(e) => setNewItem({...newItem, unitPrice: parseFloat(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter unit price"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level</label>
                <input
                  type="number"
                  value={newItem.minStockLevel}
                  onChange={(e) => setNewItem({...newItem, minStockLevel: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter minimum stock level"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <select
                  value={newItem.branchId}
                  onChange={(e) => setNewItem({...newItem, branchId: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch._id} value={branch._id}>{branch.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter item description"
                  rows="2"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newItem.location}
                  onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter storage location"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input
                  type="text"
                  value={newItem.supplier}
                  onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter supplier name"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;