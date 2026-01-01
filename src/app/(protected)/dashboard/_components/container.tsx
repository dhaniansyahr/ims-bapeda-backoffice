import Attendance from "./partials/attendance";
import TableAttendance from "./table";
import Statistic from "./partials/statistic";

export default function Container() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Intern Management System - Absence Tracking
                </p>
            </div>

            {/* My Attendance Section */}
            <Attendance />

            {/* Statistics Cards */}
            <Statistic />

            {/* Recent Absences Table */}
            <TableAttendance />
        </div>
    );
}
