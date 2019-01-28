package com.titustalk;

import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.google.gson.Gson;

import java.util.Map;

import io.invertase.firebase.Utils;


public class RemoteMessageCallService extends FirebaseMessagingService {
    private static final String TAG = "RNFMessagingService";
    public static final String MESSAGE_EVENT = "messaging-message";
    public static final String REMOTE_NOTIFICATION_EVENT = "notifications-remote-notification";

    @Override
    public void onMessageReceived(RemoteMessage message) {
        Log.d(TAG, "onMessageReceived event received");

        if (message.getNotification() != null) {
            // It's a notification, pass to the Notifications module
            Intent notificationEvent = new Intent(REMOTE_NOTIFICATION_EVENT);
            notificationEvent.putExtra("notification", message);

            // Broadcast it to the (foreground) RN Application
            LocalBroadcastManager.getInstance(this).sendBroadcast(notificationEvent);
        } else {
            // It's a data message
            // If the app is in the foreground we send it to the Messaging module
            if (Utils.isAppInForeground(this.getApplicationContext())) {
                Intent messagingEvent = new Intent(MESSAGE_EVENT);
                messagingEvent.putExtra("message", message);
                // Broadcast it so it is only available to the RN Application
                LocalBroadcastManager.getInstance(this).sendBroadcast(messagingEvent);
            } else {
                try {
                    // If the app is in the background we open app if call push notification received
                    // for (Map.Entry<String, String> entry : message.getData().entrySet()) {
                    //     Log.d(TAG, "Key = " + entry.getKey() + ", Value = " + entry.getValue());
                    // }

                    if (message.getData().get("msgData") != null) {
                        Intent callIntent = new Intent(this.getApplicationContext(), MainActivity.class);
                        callIntent.putExtra("message", message.getData().get("msgData"));
                        callIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                        //callIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
                        callIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

                        startActivity(callIntent);
                    }
                } catch (IllegalStateException ex) {
                    Log.e(TAG, "Background messages will only work if the message priority is set to 'high'", ex);
                }
            }
        }
    }
}
