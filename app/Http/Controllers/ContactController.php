<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Notifications\ContactSubmittedNotification;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Contact');
    }

    public function sendMail(ContactFormRequest $request)
    {
        // Mengirim notifikasi ke user
        $user = auth()->user();
        $user->notify(new ContactSubmittedNotification());

        // TODO: KIRIM EMAIL KE TIM SUPPORT 

        return back()->with('message', [
            'type' => 'success',
            'text' => 'Email berhasil dikirim.'
        ]);
    }
}
