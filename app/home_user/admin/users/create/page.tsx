import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AwsCognitoInfoPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex items-center justify-center mb-4">
          <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-2xl font-bold text-purple-600 mb-4">AWS Cognito User Pool</h1>
        <p className="text-gray-700">
          This action of creating a new user can be done on the AWS Cognito User Pool console.
        </p>
      </div>
    </div>
  );
};

export default AwsCognitoInfoPage;