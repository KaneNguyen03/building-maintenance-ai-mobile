  export const mockData = {
    residents: [
      {
        phone: '0123456789',
        otp: '1234',
        name: 'Nguyễn Văn A',
        property: [
          { building: 'E', floor: 14, unit: 12, status: 'Đang thuê' },
          { building: 'F', floor: 10, unit: 5, status: 'Sở hữu' }
        ]
      },
      {
        phone: '0987654321',
        otp: '5678',
        name: 'Trần Thị B',
        property: []
      }
    ],
    staff: [
      { email: 'staff1@example.com', otp: '1111', name: 'Lê Văn C' },
      { email: 'staff2@example.com', otp: '2222', name: 'Phạm Thị D' }
    ]
  };
