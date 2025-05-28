import  { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface EmployeeNotification {
  _id: string;
  newNotif: {
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    HireDate: string;
    JobTitle: string;
    DepartmentId: string;
    SupervisorId: string;
    status: string;
  };
  __v: number;
}

const AccountRequestComponent = () => {
  const [requests, setRequests] = useState<EmployeeNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch account requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('https://hr-management-api-hznz.onrender.com/api/employee/notif');
        if (!response.ok) {
          throw new Error('Failed to fetch account requests');
        }
        const data = await response.json();
        setRequests(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Fetch Error:', {
          message: err instanceof Error ? err.message : 'Unknown error',
          time: new Date().toISOString(),
        });
        toast.error('Failed to load account requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Approve request
  const approveRequest = async (id: string) => {
    try {
      // In a real app, you would call your API to approve the request
      // For now, we'll just update the local state
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === id
            ? {
                ...request,
                newNotif: { ...request.newNotif, status: 'Approved' },
              }
            : request
        )
      );
      toast.success('Account request approved!');
    } catch (err) {
      console.error('Approve Error:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        time: new Date().toISOString(),
      });
      toast.error('Failed to approve request');
    }
  };

  // Reject request
  const rejectRequest = async (id: string) => {
    try {
      // In a real app, you would call your API to reject the request
      // For now, we'll just update the local state
      setRequests(prevRequests =>
        prevRequests.filter(request => request._id !== id)
      );
      toast.success('Account request rejected!');
    } catch (err) {
      console.error('Reject Error:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        time: new Date().toISOString(),
      });
      toast.error('Failed to reject request');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading account requests...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (requests.length === 0) {
    return <div className="text-center py-8">No account requests found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Account Requests</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.newNotif.FirstName} {request.newNotif.LastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.newNotif.PhoneNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.newNotif.Email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.newNotif.JobTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.newNotif.DepartmentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${request.newNotif.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          request.newNotif.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}
                    >
                      {request.newNotif.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => approveRequest(request._id)}
                      className="text-green-600 hover:text-green-900 mr-4"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectRequest(request._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountRequestComponent;