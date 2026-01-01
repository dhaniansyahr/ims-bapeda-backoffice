"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { DateTime } from "luxon";
import { cn } from "@/utils/classname";
import { toast } from "sonner";
import { Modal } from "@/components/modal";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

type TAttendanceStatus = "present" | "absent" | "sick" | "permit" | null;

export default function Attendance() {
    const [currentStatus, setCurrentStatus] = useState<TAttendanceStatus>(null);
    const [checkInTime, setCheckInTime] = useState<string | null>(null);
    const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
    const [isSickModalOpen, setIsSickModalOpen] = useState(false);
    const [isPermitModalOpen, setIsPermitModalOpen] = useState(false);
    const [reason, setReason] = useState("");

    const currentDate = DateTime.now().toLocaleString(DateTime.DATE_FULL);
    const currentTime = DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE);

    const onCheckIn = () => {
        const now = DateTime.now();
        const timeString = now.toLocaleString(DateTime.TIME_24_SIMPLE);
        setCheckInTime(timeString);
        setCurrentStatus("present");
        setIsCheckInModalOpen(false);
        toast.success("Checked in successfully!");
    };

    const onMarkAsSick = () => {
        if (!reason.trim()) {
            toast.error("Please provide a reason");
            return;
        }
        setCurrentStatus("sick");
        setIsSickModalOpen(false);
        setReason("");
        toast.success("Marked as sick leave");
    };

    const onRequestPermit = () => {
        if (!reason.trim()) {
            toast.error("Please provide a reason");
            return;
        }
        setCurrentStatus("permit");
        setIsPermitModalOpen(false);
        setReason("");
        toast.success("Permit request submitted");
    };

    const onCheckOut = () => {
        setCheckInTime(null);
        setCurrentStatus(null);
        toast.success("Checked out successfully!");
    };

    const ATTENDANCE_OPTIONS = [
        {
            label: "Check In",
            icon: "mdi:login",
            class: "bg-green-50 text-green-600",
            onClick: onCheckIn,
        },
        {
            label: "Check Out",
            icon: "mdi:logout",
            class: "bg-red-50 text-red-600",
            onClick: onCheckOut,
        },
        {
            label: "Mark as Sick",
            icon: "mdi:hospital",
            class: "bg-orange-50 text-orange-600",
            onClick: onMarkAsSick,
        },
        {
            label: "Request Permit",
            icon: "mdi:calendar-alert",
            class: "bg-blue-50 text-blue-600",
            onClick: onRequestPermit,
        },
    ];

    const STATUS = {
        present: {
            class: "bg-green-100",
            icon: "mdi:check-circle",
            iconClass: "text-green-600",
            label: "Present",
            description: "You are present today",
        },
        absent: {
            class: "bg-red-100",
            icon: "mdi:close-circle",
            iconClass: "text-red-600",
            label: "Absent",
            description: "You are absent today",
        },
        sick: {
            class: "bg-orange-100",
            icon: "mdi:hospital",
            iconClass: "text-orange-600",
            label: "Sick",
            description: "You are sick today",
        },
        permit: {
            class: "bg-blue-100",
            icon: "mdi:calendar-alert",
            iconClass: "text-blue-600",
            label: "Permit",
            description: "You are on permit today",
        },
    };

    return (
        <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                        <Icon
                            icon="mdi:account-check"
                            className="h-5 w-5 text-blue-600"
                        />
                    </div>
                    <div>
                        <CardTitle>Absensi Saya</CardTitle>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            {currentDate} • {currentTime}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {/* Current Status Display */}
                    {currentStatus && (
                        <div className="rounded-lg border bg-white p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={cn(
                                            "rounded-full p-2",
                                            STATUS[currentStatus].class
                                        )}
                                    >
                                        <Icon
                                            icon={STATUS[currentStatus].icon}
                                            className={cn(
                                                "h-5 w-5",
                                                STATUS[currentStatus].iconClass
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {STATUS[currentStatus].label}
                                        </p>
                                        {checkInTime && (
                                            <p className="text-sm text-muted-foreground">
                                                Checked in at {checkInTime}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {currentStatus === "present" && (
                                    <Button
                                        variant="outline"
                                        onClick={onCheckOut}
                                    >
                                        <Icon icon="mdi:logout" />
                                        Check Out
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {!currentStatus && (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {ATTENDANCE_OPTIONS.map((option) => (
                                <Button
                                    key={option.label}
                                    size="lg"
                                    className={cn(
                                        "h-auto flex-col gap-2 py-4",
                                        option.class
                                    )}
                                    onClick={option.onClick}
                                >
                                    <Icon
                                        icon={option.icon}
                                        className="h-6 w-6"
                                    />
                                    <span>{option.label}</span>
                                </Button>
                            ))}
                        </div>
                    )}

                    {/* Modals */}
                    <Modal
                        open={isCheckInModalOpen}
                        onOpenChange={setIsCheckInModalOpen}
                        title="Check In"
                        description="Confirm your check-in"
                        footer={
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsCheckInModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={onCheckIn}>
                                    Check In Now
                                </Button>
                            </>
                        }
                    >
                        <p className="text-sm text-muted-foreground">
                            You are about to check in. The current time will be
                            recorded as your check-in time.
                        </p>
                    </Modal>

                    <Modal
                        open={isSickModalOpen}
                        onOpenChange={setIsSickModalOpen}
                        title="Mark as Sick Leave"
                        description="Please provide a reason for your sick leave"
                        footer={
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsSickModalOpen(false);
                                        setReason("");
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={onMarkAsSick}>Submit</Button>
                            </>
                        }
                    >
                        <Field>
                            <FieldLabel>Reason *</FieldLabel>
                            <Textarea
                                placeholder="Enter the reason for your sick leave..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={4}
                            />
                            <FieldError errors={[]} />
                        </Field>
                    </Modal>

                    <Modal
                        open={isPermitModalOpen}
                        onOpenChange={setIsPermitModalOpen}
                        title="Request Permit"
                        description="Please provide a reason for your permit request"
                        footer={
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsPermitModalOpen(false);
                                        setReason("");
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={onRequestPermit}>
                                    Submit Request
                                </Button>
                            </>
                        }
                    >
                        <Field>
                            <FieldLabel>Reason *</FieldLabel>
                            <Textarea
                                placeholder="Enter the reason for your permit request..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={4}
                            />
                            <FieldError errors={[]} />
                        </Field>
                    </Modal>
                </div>
            </CardContent>
        </Card>
    );
}
