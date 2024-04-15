<?php

namespace App\Notifications;

use App\Models\Contest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContestRegistrationNotification extends Notification
{
    use Queueable;

    /**
     * The contest instance.
     *
     * @var Contest
     */
    private $contest;

    /**
     * Create a new notification instance.
     */
    public function __construct(Contest $contest)
    {
        $this->contest = $contest;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Bajra Sandhi - Pendaftaran Lomba')
            ->greeting('Halo, ' . $notifiable->full_name)
            ->line("Kamu baru saja mendaftarkan diri di " . $this->contest->title . ".")
            ->line('Terima kasih telah mendaftar dan selamat berlomba!! 😊');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
