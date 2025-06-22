
import React, { useState } from 'react';
import { LogOut, RefreshCw, Filter, CheckCircle, Clock, Building, Phone, MapPin, Package, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Inquiry {
  id: string;
  name: string;
  company: string;
  phone: string;
  city: string;
  wireSize: string;
  quantity: string;
  message: string;
  status: 'pending' | 'attended';
  date: string;
}

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      company: 'Kumar Industries',
      phone: '+91 98765 43210',
      city: 'Mumbai',
      wireSize: '2.5mm',
      quantity: '500 meters',
      message: 'Need copper wire for electrical installation project. Please provide best quote.',
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      company: 'Sharma Electricals',
      phone: '+91 87654 32109',
      city: 'Delhi',
      wireSize: '4mm',
      quantity: '1000 meters',
      message: 'Bulk order for residential project. Need delivery by next week.',
      status: 'attended',
      date: '2024-01-14'
    },
    {
      id: '3',
      name: 'Amit Patel',
      company: 'Patel Construction',
      phone: '+91 76543 21098',
      city: 'Ahmedabad',
      wireSize: '1.5mm',
      quantity: '750 meters',
      message: 'Required for new construction project. Please send samples first.',
      status: 'pending',
      date: '2024-01-13'
    },
    {
      id: '4',
      name: 'Sunita Verma',
      company: 'Verma Enterprises',
      phone: '+91 65432 10987',
      city: 'Pune',
      wireSize: '6mm',
      quantity: '300 meters',
      message: 'Heavy duty wire needed for industrial application.',
      status: 'pending',
      date: '2024-01-12'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'attended'>('all');

  const filteredInquiries = inquiries.filter(inquiry => {
    if (filter === 'all') return true;
    return inquiry.status === filter;
  });

  const toggleStatus = (id: string) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === id 
        ? { ...inquiry, status: inquiry.status === 'pending' ? 'attended' : 'pending' }
        : inquiry
    ));
  };

  const pendingCount = inquiries.filter(i => i.status === 'pending').length;
  const attendedCount = inquiries.filter(i => i.status === 'attended').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SW</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Shivam Wire Traders</h1>
                <p className="text-sm text-gray-500">Leads Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">{inquiries.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Attended</p>
                  <p className="text-2xl font-bold text-gray-900">{attendedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <Select value={filter} onValueChange={(value: 'all' | 'pending' | 'attended') => setFilter(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Inquiries</SelectItem>
                  <SelectItem value="pending">Pending Only</SelectItem>
                  <SelectItem value="attended">Attended Only</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">
                Showing {filteredInquiries.length} of {inquiries.length} inquiries
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <Card key={inquiry.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1 space-y-3">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{inquiry.name}</h3>
                        <Badge variant={inquiry.status === 'pending' ? 'destructive' : 'default'}>
                          {inquiry.status === 'pending' ? 'Pending' : 'Attended'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1 sm:mt-0">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(inquiry.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{inquiry.company}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{inquiry.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{inquiry.city}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{inquiry.wireSize} - {inquiry.quantity}</span>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{inquiry.message}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="lg:ml-6">
                    <Button
                      onClick={() => toggleStatus(inquiry.id)}
                      variant={inquiry.status === 'pending' ? 'default' : 'outline'}
                      className={`w-full lg:w-auto ${
                        inquiry.status === 'pending' 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'text-orange-600 border-orange-200 hover:bg-orange-50'
                      }`}
                    >
                      {inquiry.status === 'pending' ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Attended
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 mr-2" />
                          Mark Pending
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInquiries.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
              <p className="text-gray-500">No inquiries match your current filter selection.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
