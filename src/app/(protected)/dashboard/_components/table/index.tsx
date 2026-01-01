"use client";

import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AbsenceRecord, columns } from "./columns";

const mockAbsences: AbsenceRecord[] = [
    {
        id: "1",
        internName: "John Doe",
        email: "john.doe@example.com",
        date: "2024-01-15",
        status: "absent",
        reason: "Family emergency",
    },
    {
        id: "2",
        internName: "Jane Smith",
        email: "jane.smith@example.com",
        date: "2024-01-15",
        status: "present",
        checkIn: "08:30",
        checkOut: "17:00",
    },
    {
        id: "3",
        internName: "Bob Johnson",
        email: "bob.johnson@example.com",
        date: "2024-01-15",
        status: "sick",
        reason: "Flu",
    },
    {
        id: "4",
        internName: "Alice Williams",
        email: "alice.williams@example.com",
        date: "2024-01-14",
        status: "permit",
        reason: "Medical appointment",
    },
    {
        id: "5",
        internName: "Charlie Brown",
        email: "charlie.brown@example.com",
        date: "2024-01-15",
        status: "present",
        checkIn: "09:00",
        checkOut: "18:00",
    },
];

export default function TableAttendance() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Absences</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Latest absence records for all interns
                </p>
            </CardHeader>
            <CardContent>
                <DataTable
                    data={mockAbsences}
                    columns={columns}
                    loading={false}
                    rowsPerPage={10}
                    totalData={mockAbsences.length}
                />
            </CardContent>
        </Card>
    );
}
