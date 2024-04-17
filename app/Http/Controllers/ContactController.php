<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Mail\ContactMail;
use App\Notifications\ContactSubmittedNotification;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Contact');
    }

    public function sendMail(ContactFormRequest $request)
    {
        $user = auth()->user();
        if ($user) {
            $user->notify(new ContactSubmittedNotification());
        }

        Mail::to(env("MAIL_FROM_ADDRESS", "daniel032902@gmail.com"))->send(
            new ContactMail(
                $request->sender_mail,
                $request->name,
                $request->title,
                $request->description
            )
        );

        return back()->with('message', [
            'type' => 'success',
            'text' => 'Email berhasil dikirim.'
        ]);
    }
}
