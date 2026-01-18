"use client"

import { Suspense, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle, ChevronRight, CheckCircle2 } from "lucide-react"

// Detailed help articles content
const helpArticles: Record<string, Record<string, any>> = {
  en: {
    "getting-started": {
      "create-account": {
        title: "How to Create an Account",
        content: `
## Creating Your Life with Pi Account

Follow these simple steps to create your account and start using Life with Pi:

### Step 1: Download the App
- **iOS**: Download from the App Store
- **Android**: Download from Google Play Store
- **Web**: Visit pilife.vn

### Step 2: Start Registration
1. Open the app and tap "Sign Up" or "Create Account"
2. Choose your registration method:
   - **Email**: Enter your email address
   - **Phone Number**: Enter your mobile number
   - **Pi Network**: Use your existing Pi Network credentials (recommended)

### Step 3: Verify Your Identity
- If using email: Check your inbox for a verification link
- If using phone: Enter the OTP code sent via SMS
- If using Pi Network: Authorize the connection in Pi Browser

### Step 4: Complete Your Profile
1. Enter your full name
2. Set a strong password (at least 8 characters, including numbers and symbols)
3. Add a profile picture (optional)
4. Accept the Terms of Service and Privacy Policy

### Step 5: Connect Your Pi Wallet
1. Open the Pi Wallet connection screen
2. Tap "Connect Wallet"
3. Authorize the connection in your Pi Browser
4. Wait for verification (usually instant)

### Tips for Account Security
- Use a unique password that you don't use elsewhere
- Enable two-factor authentication (2FA)
- Never share your password or Pi wallet passphrase
- Keep your app updated to the latest version

### Troubleshooting
- **Can't receive verification email?** Check your spam folder
- **OTP not arriving?** Wait 60 seconds and try again
- **Pi Network connection failed?** Make sure you're logged into Pi Browser
        `,
        relatedArticles: ["connect-wallet", "navigate-app", "pi-payments"],
      },
      "connect-wallet": {
        title: "Connecting Your Pi Wallet",
        content: `
## How to Connect Your Pi Wallet

Your Pi Wallet is essential for making transactions on Life with Pi. Here's how to connect it:

### Prerequisites
- Active Pi Network account
- Completed KYC verification
- Pi Wallet set up in Pi Browser

### Connection Steps

#### Step 1: Access Wallet Settings
1. Open Life with Pi app
2. Go to Settings > Payment Methods
3. Tap "Connect Pi Wallet"

#### Step 2: Authorize in Pi Browser
1. The app will redirect to Pi Browser
2. Review the permissions requested
3. Tap "Approve" to authorize

#### Step 3: Verify Connection
1. Return to Life with Pi
2. You should see your wallet address displayed
3. Your Pi balance will sync automatically

### Security Features
- **Read-only access**: We can only view your balance, not access your funds
- **Transaction approval**: Every payment requires your explicit approval in Pi Browser
- **Spending limits**: Set daily or monthly spending limits for added security

### Troubleshooting Connection Issues

**Problem**: Connection keeps failing
- Ensure Pi Browser is updated
- Check your internet connection
- Try logging out and back into Pi Browser

**Problem**: Balance not showing
- Refresh the app
- Check if your Pi Wallet is properly synced in Pi Browser
- Wait a few minutes for blockchain sync

**Problem**: "Wallet not found" error
- Make sure KYC is completed
- Verify you're using the same Pi account
- Contact support if issue persists
        `,
        relatedArticles: ["create-account", "pi-payments", "security-settings"],
      },
      "navigate-app": {
        title: "Navigating the App",
        content: `
## Getting Around Life with Pi

Learn how to navigate the app and find what you need quickly.

### Home Screen
The home screen gives you quick access to all 9 services:
- **PiFood**: Order food delivery
- **PiMove**: Book rides
- **PiShop**: Shop online
- **PiTravel**: Book travel
- **PiHealth**: Healthcare appointments
- **PiLearn**: Online courses
- **PiWork**: Find jobs
- **PiPlay**: Entertainment
- **PiPay**: Manage wallet

### Bottom Navigation
- **Home**: Main dashboard with all services
- **Services**: Full list of all services
- **Orders**: Track your orders and bookings
- **Profile**: Account settings and preferences

### Search Function
- Tap the search icon on any screen
- Search across all services
- Filter by category, price, or rating

### Quick Actions
- **Favorites**: Save restaurants, products, and more
- **Recent**: Access your recent orders and searches
- **Notifications**: Stay updated on orders and promotions

### Customization
- **Language**: Switch between Vietnamese and English
- **Theme**: Light or dark mode
- **Notifications**: Customize what alerts you receive
        `,
        relatedArticles: ["create-account", "connect-wallet"],
      },
      "pi-payments": {
        title: "Understanding Pi Payments",
        content: `
## How Pi Payments Work

Life with Pi uses Pi cryptocurrency for all transactions. Here's everything you need to know:

### Payment Process
1. **Select items/services** you want to purchase
2. **Review your order** and total Pi amount
3. **Tap "Pay with Pi"** to initiate payment
4. **Approve in Pi Browser** - You'll be redirected to confirm
5. **Wait for confirmation** - Usually takes a few seconds
6. **Receive confirmation** - Both in-app and via email

### Transaction Fees
- **Peer-to-peer transfers**: FREE
- **Service purchases**: 0-2% depending on service
- **All fees are displayed** before you confirm

### Payment Security
- All transactions are recorded on Pi blockchain
- Multi-step verification required
- Transaction IDs for all payments
- Dispute resolution available

### Refunds
- Refunds are processed in Pi
- Typically 1-3 business days
- Check service-specific refund policies

### Tips for Safe Payments
- Always verify the amount before approving
- Keep your transaction receipts
- Report suspicious activity immediately
- Don't pay outside the app
        `,
        relatedArticles: ["connect-wallet", "manage-wallet", "security-settings"],
      },
    },
    pifood: {
      "order-food": {
        title: "How to Order Food",
        content: `
## Ordering Food on PiFood

### Step 1: Browse Restaurants
- Open PiFood from the home screen
- Browse by category (Vietnamese, Japanese, Fast Food, etc.)
- Use filters: Distance, Rating, Price, Delivery Time
- Search for specific dishes or restaurants

### Step 2: Select Your Items
1. Tap on a restaurant to view menu
2. Browse menu categories
3. Tap items to add to cart
4. Customize as needed (toppings, spice level, etc.)
5. Set quantity

### Step 3: Review Cart
- Check all items and quantities
- Apply promo codes if available
- Add special instructions for kitchen

### Step 4: Checkout
1. Confirm delivery address
2. Select delivery time (ASAP or schedule)
3. Choose delivery option:
   - Standard: lower fee, 30-45 mins
   - Express: higher fee, 15-25 mins
4. Review total and pay with Pi

### Step 5: Track Your Order
- Real-time status updates
- Live map tracking
- Direct chat with driver
- Estimated arrival time

### Tips
- Order during off-peak hours for faster delivery
- Check restaurant ratings and reviews
- Save favorite restaurants for quick reorder
- Use "Reorder" for previous orders
        `,
        relatedArticles: ["track-delivery", "cancel-refund", "restaurant-issues"],
      },
      "track-delivery": {
        title: "Tracking Your Delivery",
        content: `
## Real-Time Delivery Tracking

### How to Track
1. Go to Orders tab
2. Select your active order
3. View real-time map

### Order Status Stages
1. **Order Placed**: Restaurant received your order
2. **Preparing**: Kitchen is preparing your food
3. **Ready for Pickup**: Driver assigned and heading to restaurant
4. **Picked Up**: Driver has your food
5. **On the Way**: Driver heading to your location
6. **Arriving**: Driver is nearby
7. **Delivered**: Order complete

### Communication
- **Chat with Driver**: Tap the chat icon
- **Call Driver**: Tap the phone icon
- **Share Location**: Help driver find you

### Notifications
- Push notifications for each status change
- SMS updates for important changes
- In-app alerts

### What if delivery is late?
- Check traffic conditions on map
- Contact driver for update
- Request refund if significantly delayed (2+ hours)
        `,
        relatedArticles: ["order-food", "cancel-refund", "lost-items"],
      },
      "cancel-refund": {
        title: "Cancellation and Refunds",
        content: `
## PiFood Cancellation & Refund Policy

### When You Can Cancel
- **Before restaurant confirms**: Full refund
- **After confirmed, before preparation**: 90% refund
- **During preparation**: No refund (food is being made)
- **After pickup**: No refund

### How to Cancel
1. Go to Orders > Active Orders
2. Select the order
3. Tap "Cancel Order"
4. Select reason
5. Confirm cancellation

### Refund Timeline
- Cancellation refunds: Instant to 24 hours
- Quality issue refunds: 24-48 hours after review
- Missing item refunds: 24-48 hours

### Reporting Issues
For wrong orders, missing items, or quality issues:
1. Go to order details
2. Tap "Report Issue"
3. Select issue type
4. Add photos if applicable
5. Submit for review

### Tips
- Cancel early for full refund
- Document issues with photos
- Be specific in your report
- Check refund status in PiPay
        `,
        relatedArticles: ["order-food", "track-delivery", "restaurant-issues"],
      },
      "restaurant-issues": {
        title: "Restaurant Partner Issues",
        content: `
## Resolving Restaurant Issues

### Common Issues

#### Wrong Order
1. Take photos of received items
2. Go to order details
3. Report "Wrong Items Delivered"
4. Submit photos and description
5. Choose: Refund or Replacement

#### Missing Items
1. Check the receipt/order details
2. Report "Missing Items"
3. List missing items
4. Request refund for missing items

#### Food Quality Issues
- Cold food
- Spoiled/contaminated
- Doesn't match description
- Allergen concerns

### How to Report
1. Orders > Select Order > Report Issue
2. Choose issue category
3. Provide details and photos
4. Submit within 24 hours of delivery

### Resolution Time
- Simple issues: 24 hours
- Complex issues: 48-72 hours
- Disputed cases: Up to 7 days

### Escalation
If not satisfied with resolution:
1. Contact support via Live Chat
2. Email: support@pilife.vn
3. Request supervisor review
        `,
        relatedArticles: ["order-food", "cancel-refund", "track-delivery"],
      },
    },
    pimove: {
      "book-ride": {
        title: "Booking a Ride",
        content: `
## How to Book a Ride on PiMove

### Step 1: Open PiMove
- Tap PiMove from home screen
- Allow location access for pickup

### Step 2: Set Locations
1. Your current location is auto-detected
2. Enter destination address
3. Or select from saved places

### Step 3: Choose Vehicle Type
- **PiBike**: Motorcycle, fastest, cheapest
- **PiCar**: Standard car, 4 seats
- **PiPremium**: Luxury vehicles
- **PiXL**: SUV/Van, 7 seats

### Step 4: Review & Book
1. See estimated fare
2. Check arrival time
3. Add promo code if available
4. Tap "Book Now"

### Step 5: Wait for Driver
- View driver info and rating
- Track driver on map
- Contact driver if needed

### During the Ride
- Share trip with friends/family
- Emergency button available
- Rate driver after trip

### Payment
- Auto-charged from PiPay
- Tip option available
- Receipt sent via email
        `,
        relatedArticles: ["driver-safety", "fare-calculation", "lost-items"],
      },
      "driver-safety": {
        title: "Driver Safety Features",
        content: `
## Safety Features on PiMove

### Before Your Ride
- **Verified Drivers**: All drivers background checked
- **Vehicle Info**: License plate, car model displayed
- **Driver Rating**: See ratings from other riders

### During Your Ride
- **Live Trip Sharing**: Share your route with contacts
- **Emergency Button**: Quick access to emergency services
- **In-app Chat**: Communicate without sharing phone number
- **GPS Tracking**: Real-time location monitoring

### Safety Tips
- Verify driver and vehicle match app info
- Sit in back seat when alone
- Share trip details with someone
- Trust your instincts

### Reporting Issues
- Rate driver honestly
- Report safety concerns immediately
- Use "Report Issue" in trip history

### Emergency Contacts
- In-app emergency: Tap SOS button
- Police: 113
- Support: support@pilife.vn
        `,
        relatedArticles: ["book-ride", "fare-calculation", "lost-items"],
      },
      "fare-calculation": {
        title: "Fare Calculation",
        content: `
## How Fares are Calculated

### Base Components
- **Base Fare**: Starting fee per ride
- **Distance**: Per kilometer rate
- **Time**: Per minute rate (in traffic)
- **Platform Fee**: Small service fee

### Factors Affecting Price
- **Distance**: Longer = higher fare
- **Traffic**: Heavy traffic adds time cost
- **Demand**: Surge pricing during peak hours
- **Vehicle Type**: Premium costs more

### Surge Pricing
- Applied during high demand
- Multiplier shown before booking
- Can wait for lower prices

### Payment Methods
- Pi Wallet (primary)
- Linked payment methods

### Tips for Saving
- Book during off-peak hours
- Use promo codes
- Choose economy vehicles
- Share rides when possible
        `,
        relatedArticles: ["book-ride", "driver-safety"],
      },
      "lost-items": {
        title: "Lost Items",
        content: `
## Recovering Lost Items

### Immediate Steps
1. Check "Trip History" for driver contact
2. Use in-app chat to contact driver
3. Report lost item in app

### How to Report
1. Go to Orders > Trip History
2. Select the trip
3. Tap "Lost Item"
4. Describe item
5. Submit report

### What Happens Next
- Driver notified immediately
- 24-hour response window
- Coordinate pickup if found

### Recovery Options
- Meet driver at agreed location
- Have item delivered (fee may apply)
- Pickup from PiMove hub

### Tips
- Check car before exiting
- Report immediately
- Provide accurate description
- Be responsive to driver contact

### Contact
- Support: support@pilife.vn
- Hotline: +84 28 1234 5678
        `,
        relatedArticles: ["book-ride", "driver-safety"],
      },
    },
    pipay: {
      "manage-wallet": {
        title: "Managing Your Wallet",
        content: `
## PiPay Wallet Management

### Viewing Your Balance
- Open PiPay from home screen
- Balance displayed at top
- Tap to show/hide balance

### Transaction History
- Scroll down to see all transactions
- Filter by: Date, Type, Amount
- Search specific transactions
- Export history to CSV

### Spending Analytics
- Daily/Weekly/Monthly view
- Category breakdown
- Spending trends
- Budget comparisons

### Wallet Settings
- **Display Currency**: Pi or estimated fiat
- **Privacy Mode**: Hide balance on home screen
- **Notifications**: Transaction alerts
- **Spending Limits**: Daily/Monthly caps

### Security Settings
- Enable biometric authentication
- Set up PIN code
- Configure 2FA
- Review connected apps

### Tips
- Set spending alerts
- Review transactions regularly
- Keep emergency fund
- Enable all security features
        `,
        relatedArticles: ["send-receive", "transaction-history", "security-settings"],
      },
      "send-receive": {
        title: "Sending and Receiving Pi",
        content: `
## How to Send and Receive Pi

### Sending Pi

#### Method 1: By Username
1. Open PiPay > Send
2. Enter recipient's username
3. Enter amount
4. Add note (optional)
5. Review and confirm
6. Approve in Pi Browser

#### Method 2: By QR Code
1. Open PiPay > Send
2. Tap "Scan QR"
3. Scan recipient's QR code
4. Enter amount
5. Confirm and approve

#### Method 3: By Wallet Address
1. Open PiPay > Send
2. Tap "Enter Address"
3. Paste wallet address
4. Enter amount
5. Double-check address
6. Confirm and approve

### Receiving Pi

#### Share Your QR Code
1. Open PiPay > Receive
2. Show your QR code
3. Others scan to send you Pi

#### Share Your Address
1. Open PiPay > Receive
2. Tap "Copy Address"
3. Share with sender

### Transaction Limits
- Daily: π 10,000
- Monthly: π 50,000
- Per transaction: π 5,000
- Contact support for higher limits

### Security Tips
- Verify recipient before sending
- Start with small amounts for new contacts
- Never share your passphrase
- Report suspicious requests
        `,
        relatedArticles: ["manage-wallet", "transaction-history", "security-settings"],
      },
      "transaction-history": {
        title: "Transaction History",
        content: `
## Understanding Your Transaction History

### Accessing History
1. Open PiPay
2. Scroll down or tap "See All"
3. View complete transaction list

### Transaction Types
- **Sent**: Pi you sent to others
- **Received**: Pi received from others
- **Purchase**: Payments for services
- **Refund**: Returned amounts
- **Reward**: Promotional credits

### Transaction Details
Each transaction shows:
- Date and time
- Amount (+ or -)
- Recipient/Sender
- Transaction ID
- Status
- Category

### Filtering Options
- **Date Range**: Today, This Week, Custom
- **Type**: All, Sent, Received, Purchases
- **Amount**: Min/Max range
- **Status**: Completed, Pending, Failed

### Exporting Data
1. Tap "Export" icon
2. Select date range
3. Choose format (CSV/PDF)
4. Download or share

### Transaction Status
- **Completed**: Successfully processed
- **Pending**: Awaiting blockchain confirmation
- **Failed**: Transaction did not complete
- **Disputed**: Under review
        `,
        relatedArticles: ["manage-wallet", "send-receive", "security-settings"],
      },
      "security-settings": {
        title: "Security Settings",
        content: `
## Securing Your PiPay Account

### Essential Security Features

#### 1. Two-Factor Authentication (2FA)
- Go to Settings > Security > 2FA
- Choose: SMS, Email, or Authenticator App
- Authenticator App recommended for best security

#### 2. Biometric Login
- Enable fingerprint or face recognition
- Settings > Security > Biometric
- Faster and more secure login

#### 3. PIN Code
- Set 6-digit PIN for transactions
- Required for sending Pi
- Change regularly

#### 4. Session Management
- View active sessions
- Log out remotely
- Set auto-logout timer

### Spending Controls
- **Daily Limit**: Max spending per day
- **Transaction Limit**: Max per transaction
- **Notification Threshold**: Alert for large amounts

### Security Alerts
- Login from new device
- Large transactions
- Password changes
- Failed login attempts

### What to Do If Compromised
1. Change password immediately
2. Enable 2FA if not active
3. Review recent transactions
4. Report unauthorized activity
5. Contact support: security@pilife.vn

### Best Practices
- Use unique, strong password
- Never share credentials
- Update app regularly
- Be cautious of phishing
- Verify all payment requests
        `,
        relatedArticles: ["manage-wallet", "send-receive", "transaction-history"],
      },
    },
    account: {
      "update-profile": {
        title: "Updating Profile Information",
        content: `
## How to Update Your Profile

### Accessing Profile Settings
1. Tap Profile icon (bottom right)
2. Tap "Edit Profile"

### What You Can Update
- **Name**: Your display name
- **Photo**: Profile picture
- **Phone**: Contact number
- **Email**: Email address
- **Address**: Default delivery address

### Changing Profile Photo
1. Tap on current photo
2. Choose: Camera or Gallery
3. Crop and adjust
4. Save changes

### Updating Contact Info
- Phone changes require OTP verification
- Email changes require link confirmation

### Privacy Settings
- Control who sees your profile
- Manage data sharing preferences
        `,
        relatedArticles: ["change-password", "notifications", "delete-account"],
      },
      "change-password": {
        title: "Changing Password",
        content: `
## How to Change Your Password

### Steps to Change Password
1. Go to Profile > Settings
2. Tap "Security"
3. Select "Change Password"
4. Enter current password
5. Enter new password
6. Confirm new password
7. Tap "Save"

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character

### Forgot Password?
1. Tap "Forgot Password" on login
2. Enter email or phone
3. Check for reset link/code
4. Create new password

### Security Tips
- Don't reuse passwords
- Change every 3-6 months
- Use password manager
        `,
        relatedArticles: ["update-profile", "notifications", "security-settings"],
      },
      notifications: {
        title: "Notification Preferences",
        content: `
## Managing Notifications

### Notification Types
- **Orders**: Status updates, delivery alerts
- **Promotions**: Deals and discounts
- **Account**: Security alerts, updates
- **Messages**: Chat notifications

### How to Customize
1. Profile > Settings > Notifications
2. Toggle each category on/off
3. Choose delivery method (push, email, SMS)

### Recommended Settings
- Keep order notifications ON
- Keep security alerts ON
- Promotions based on preference

### Quiet Hours
- Set times when notifications are muted
- Emergency alerts still come through
        `,
        relatedArticles: ["update-profile", "change-password"],
      },
      "delete-account": {
        title: "Deleting Account",
        content: `
## How to Delete Your Account

### Before You Delete
- Download your data
- Complete pending orders
- Withdraw remaining Pi balance
- Cancel any subscriptions

### Deletion Process
1. Profile > Settings > Account
2. Tap "Delete Account"
3. Enter password to confirm
4. Select deletion reason
5. Confirm deletion

### What Gets Deleted
- Profile information
- Order history
- Saved addresses
- Preferences

### What We Keep (as required by law)
- Transaction records (7 years)
- Security logs
- Legal compliance data

### Reactivation
- 30-day grace period
- Log in to cancel deletion
- After 30 days, permanent
        `,
        relatedArticles: ["update-profile", "change-password"],
      },
    },
    troubleshooting: {
      "app-not-loading": {
        title: "App Not Loading",
        content: `
## Fixing App Loading Issues

### Quick Fixes
1. **Close and reopen** the app
2. **Check internet** connection
3. **Restart** your device
4. **Update** to latest version

### Clear App Cache
**Android:**
1. Settings > Apps > Life with Pi
2. Storage > Clear Cache

**iOS:**
1. Delete and reinstall app
2. Or: Settings > Life with Pi > Clear Data

### Network Issues
- Try switching WiFi/Mobile data
- Disable VPN if using
- Check if other apps work

### Still Not Working?
- Check server status on our social media
- Contact support with error details
        `,
        relatedArticles: ["payment-failed", "location-issues", "verification"],
      },
      "payment-failed": {
        title: "Payment Failed",
        content: `
## Resolving Payment Failures

### Common Causes
- Insufficient Pi balance
- Network connectivity issues
- Pi Browser not updated
- Wallet connection expired

### Solutions

#### Check Your Balance
1. Open PiPay
2. Verify sufficient funds
3. Include fees in calculation

#### Reconnect Wallet
1. Settings > Payment Methods
2. Disconnect Pi Wallet
3. Reconnect and authorize

#### Update Pi Browser
- Ensure latest version
- Log out and back in

### If Payment Was Charged But Failed
1. Wait 15 minutes
2. Check transaction history
3. If not refunded, contact support
4. Provide transaction ID

### Contact Support
- Email: support@pilife.vn
- Include: Transaction ID, amount, time
        `,
        relatedArticles: ["app-not-loading", "connect-wallet", "manage-wallet"],
      },
      "location-issues": {
        title: "Location Services Issues",
        content: `
## Fixing Location Problems

### Enable Location Services

**Android:**
1. Settings > Location > ON
2. App permissions > Life with Pi > Allow

**iOS:**
1. Settings > Privacy > Location
2. Life with Pi > While Using

### Improve Accuracy
- Enable High Accuracy mode
- Be near windows/outdoors
- Wait for GPS lock

### Common Issues

**Location not updating:**
- Toggle location off/on
- Restart app

**Wrong location shown:**
- Manually enter address
- Drag pin to correct spot

**"Location unavailable":**
- Check device location settings
- Grant app permissions
        `,
        relatedArticles: ["app-not-loading", "book-ride", "order-food"],
      },
      verification: {
        title: "Verification Problems",
        content: `
## Solving Verification Issues

### Email Verification
- Check spam/junk folder
- Add noreply@pilife.vn to contacts
- Request new verification email
- Wait 5 minutes between requests

### Phone Verification
- Ensure correct country code
- Check SMS inbox
- Wait 60 seconds for retry
- Try voice call option

### Pi Network Verification
- Update Pi Browser
- Log out and back in
- Check Pi Network app status
- Ensure KYC is complete

### Still Having Issues?
- Contact: support@pilife.vn
- Include: Username, contact method used
        `,
        relatedArticles: ["create-account", "connect-wallet", "app-not-loading"],
      },
    },
  },
  vi: {
    "getting-started": {
      "create-account": {
        title: "Cách Tạo Tài Khoản",
        content: `
## Tạo Tài Khoản Life with Pi

Làm theo các bước đơn giản sau để tạo tài khoản và bắt đầu sử dụng Life with Pi:

### Bước 1: Tải Ứng Dụng
- **iOS**: Tải từ App Store
- **Android**: Tải từ Google Play Store
- **Web**: Truy cập pilife.vn

### Bước 2: Bắt Đầu Đăng Ký
1. Mở ứng dụng và nhấn "Đăng Ký" hoặc "Tạo Tài Khoản"
2. Chọn phương thức đăng ký:
   - **Email**: Nhập địa chỉ email
   - **Số Điện Thoại**: Nhập số di động
   - **Pi Network**: Sử dụng thông tin Pi Network (khuyến nghị)

### Bước 3: Xác Minh Danh Tính
- Nếu dùng email: Kiểm tra hộp thư để lấy liên kết xác minh
- Nếu dùng điện thoại: Nhập mã OTP gửi qua SMS
- Nếu dùng Pi Network: Xác nhận kết nối trong Pi Browser

### Bước 4: Hoàn Thiện Hồ Sơ
1. Nhập họ tên đầy đủ
2. Đặt mật khẩu mạnh (ít nhất 8 ký tự, bao gồm số và ký hiệu)
3. Thêm ảnh đại diện (tùy chọn)
4. Chấp nhận Điều Khoản Dịch Vụ và Chính Sách Quyền Riêng Tư

### Bước 5: Kết Nối Ví Pi
1. Mở màn hình kết nối Ví Pi
2. Nhấn "Kết Nối Ví"
3. Xác nhận kết nối trong Pi Browser
4. Chờ xác minh (thường là ngay lập tức)

### Mẹo Bảo Mật Tài Khoản
- Sử dụng mật khẩu duy nhất không dùng ở nơi khác
- Bật xác thực hai yếu tố (2FA)
- Không bao giờ chia sẻ mật khẩu hoặc cụm từ khôi phục ví
- Cập nhật ứng dụng lên phiên bản mới nhất

### Khắc Phục Sự Cố
- **Không nhận được email xác minh?** Kiểm tra thư mục spam
- **OTP không đến?** Đợi 60 giây và thử lại
- **Kết nối Pi Network thất bại?** Đảm bảo đã đăng nhập vào Pi Browser
        `,
        relatedArticles: ["connect-wallet", "navigate-app", "pi-payments"],
      },
      "connect-wallet": {
        title: "Kết Nối Ví Pi",
        content: `
## Cách Kết Nối Ví Pi

Ví Pi là thiết yếu để thực hiện giao dịch trên Life with Pi. Đây là cách kết nối:

### Điều Kiện Tiên Quyết
- Tài khoản Pi Network đang hoạt động
- Đã hoàn thành xác minh KYC
- Ví Pi đã thiết lập trong Pi Browser

### Các Bước Kết Nối

#### Bước 1: Truy Cập Cài Đặt Ví
1. Mở ứng dụng Life with Pi
2. Vào Cài Đặt > Phương Thức Thanh Toán
3. Nhấn "Kết Nối Ví Pi"

#### Bước 2: Xác Nhận Trong Pi Browser
1. Ứng dụng sẽ chuyển hướng đến Pi Browser
2. Xem xét các quyền được yêu cầu
3. Nhấn "Chấp Thuận" để xác nhận

#### Bước 3: Xác Minh Kết Nối
1. Quay lại Life with Pi
2. Bạn sẽ thấy địa chỉ ví hiển thị
3. Số dư Pi sẽ tự động đồng bộ

### Tính Năng Bảo Mật
- **Quyền chỉ đọc**: Chúng tôi chỉ có thể xem số dư, không truy cập quỹ
- **Xác nhận giao dịch**: Mọi thanh toán cần sự chấp thuận của bạn trong Pi Browser
- **Hạn mức chi tiêu**: Đặt hạn mức hàng ngày hoặc hàng tháng để tăng bảo mật

### Khắc Phục Sự Cố Kết Nối

**Vấn đề**: Kết nối liên tục thất bại
- Đảm bảo Pi Browser đã cập nhật
- Kiểm tra kết nối internet
- Thử đăng xuất và đăng nhập lại Pi Browser

**Vấn đề**: Số dư không hiển thị
- Làm mới ứng dụng
- Kiểm tra Ví Pi đã đồng bộ trong Pi Browser chưa
- Đợi vài phút để blockchain đồng bộ

**Vấn đề**: Lỗi "Không tìm thấy ví"
- Đảm bảo KYC đã hoàn thành
- Xác minh bạn đang dùng cùng tài khoản Pi
- Liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn
        `,
        relatedArticles: ["create-account", "pi-payments", "security-settings"],
      },
      "navigate-app": {
        title: "Hướng Dẫn Sử Dụng Ứng Dụng",
        content: `
## Điều Hướng Life with Pi

Tìm hiểu cách điều hướng ứng dụng và tìm nhanh những gì bạn cần.

### Màn Hình Chính
Màn hình chính cho bạn truy cập nhanh đến 9 dịch vụ:
- **PiFood**: Đặt giao đồ ăn
- **PiMove**: Đặt xe
- **PiShop**: Mua sắm trực tuyến
- **PiTravel**: Đặt du lịch
- **PiHealth**: Đặt lịch khám bệnh
- **PiLearn**: Khóa học trực tuyến
- **PiWork**: Tìm việc
- **PiPlay**: Giải trí
- **PiPay**: Quản lý ví

### Thanh Điều Hướng Dưới
- **Trang Chủ**: Bảng điều khiển với tất cả dịch vụ
- **Dịch Vụ**: Danh sách đầy đủ các dịch vụ
- **Đơn Hàng**: Theo dõi đơn hàng và đặt chỗ
- **Hồ Sơ**: Cài đặt tài khoản và tùy chọn

### Chức Năng Tìm Kiếm
- Nhấn biểu tượng tìm kiếm trên bất kỳ màn hình nào
- Tìm kiếm trong tất cả dịch vụ
- Lọc theo danh mục, giá hoặc đánh giá

### Hành Động Nhanh
- **Yêu Thích**: Lưu nhà hàng, sản phẩm, v.v.
- **Gần Đây**: Truy cập đơn hàng và tìm kiếm gần đây
- **Thông Báo**: Cập nhật về đơn hàng và khuyến mãi

### Tùy Chỉnh
- **Ngôn Ngữ**: Chuyển đổi giữa Tiếng Việt và Tiếng Anh
- **Giao Diện**: Chế độ sáng hoặc tối
- **Thông Báo**: Tùy chỉnh cảnh báo nhận được
        `,
        relatedArticles: ["create-account", "connect-wallet"],
      },
      "pi-payments": {
        title: "Hiểu Về Thanh Toán Pi",
        content: `
## Cách Thanh Toán Pi Hoạt Động

Life with Pi sử dụng tiền điện tử Pi cho tất cả giao dịch. Đây là mọi thứ bạn cần biết:

### Quy Trình Thanh Toán
1. **Chọn sản phẩm/dịch vụ** bạn muốn mua
2. **Xem lại đơn hàng** và tổng số Pi
3. **Nhấn "Thanh Toán Bằng Pi"** để bắt đầu
4. **Xác nhận trong Pi Browser** - Bạn sẽ được chuyển hướng để xác nhận
5. **Chờ xác nhận** - Thường mất vài giây
6. **Nhận xác nhận** - Cả trong ứng dụng và qua email

### Phí Giao Dịch
- **Chuyển khoản P2P**: MIỄN PHÍ
- **Mua dịch vụ**: 0-2% tùy dịch vụ
- **Tất cả phí được hiển thị** trước khi bạn xác nhận

### Bảo Mật Thanh Toán
- Tất cả giao dịch được ghi trên blockchain Pi
- Yêu cầu xác minh nhiều bước
- Mã giao dịch cho mọi thanh toán
- Có giải quyết tranh chấp

### Hoàn Tiền
- Hoàn tiền được xử lý bằng Pi
- Thường 1-3 ngày làm việc
- Kiểm tra chính sách hoàn tiền cụ thể của dịch vụ

### Mẹo Thanh Toán An Toàn
- Luôn xác minh số tiền trước khi chấp thuận
- Giữ biên lai giao dịch
- Báo cáo hoạt động đáng ngờ ngay lập tức
- Không thanh toán ngoài ứng dụng
        `,
        relatedArticles: ["connect-wallet", "manage-wallet", "security-settings"],
      },
    },
    pifood: {
      "order-food": {
        title: "Cách Đặt Món Ăn",
        content: `
## Đặt Món Trên PiFood

### Bước 1: Duyệt Nhà Hàng
- Mở PiFood từ màn hình chính
- Duyệt theo danh mục (Việt Nam, Nhật Bản, Đồ ăn nhanh, v.v.)
- Sử dụng bộ lọc: Khoảng cách, Đánh giá, Giá, Thời gian giao
- Tìm kiếm món ăn hoặc nhà hàng cụ thể

### Bước 2: Chọn Món
1. Nhấn vào nhà hàng để xem thực đơn
2. Duyệt các danh mục thực đơn
3. Nhấn vào món để thêm vào giỏ
4. Tùy chỉnh theo ý muốn (topping, độ cay, v.v.)
5. Đặt số lượng

### Bước 3: Xem Lại Giỏ Hàng
- Kiểm tra tất cả món và số lượng
- Áp dụng mã khuyến mãi nếu có
- Thêm ghi chú đặc biệt cho nhà bếp

### Bước 4: Thanh Toán
1. Xác nhận địa chỉ giao hàng
2. Chọn thời gian giao (Ngay hoặc đặt lịch)
3. Chọn tùy chọn giao hàng:
   - Tiêu chuẩn: phí thấp hơn, 30-45 phút
   - Nhanh: phí cao hơn, 15-25 phút
4. Xem lại tổng và thanh toán bằng Pi

### Bước 5: Theo Dõi Đơn Hàng
- Cập nhật trạng thái thời gian thực
- Theo dõi bản đồ trực tiếp
- Chat trực tiếp với tài xế
- Thời gian đến ước tính

### Mẹo
- Đặt hàng ngoài giờ cao điểm để giao nhanh hơn
- Kiểm tra đánh giá nhà hàng
- Lưu nhà hàng yêu thích để đặt lại nhanh
- Sử dụng "Đặt lại" cho đơn hàng trước
        `,
        relatedArticles: ["track-delivery", "cancel-refund", "restaurant-issues"],
      },
      "track-delivery": {
        title: "Theo Dõi Đơn Giao Hàng",
        content: `
## Theo Dõi Giao Hàng Thời Gian Thực

### Cách Theo Dõi
1. Vào tab Đơn Hàng
2. Chọn đơn hàng đang hoạt động
3. Xem bản đồ thời gian thực

### Các Giai Đoạn Trạng Thái Đơn Hàng
1. **Đã Đặt Hàng**: Nhà hàng nhận đơn
2. **Đang Chuẩn Bị**: Nhà bếp đang nấu
3. **Sẵn Sàng Lấy Hàng**: Tài xế được chỉ định và đang đến nhà hàng
4. **Đã Lấy Hàng**: Tài xế đã có đồ ăn
5. **Đang Trên Đường**: Tài xế đang đến địa chỉ của bạn
6. **Sắp Đến**: Tài xế đang ở gần
7. **Đã Giao**: Hoàn thành đơn hàng

### Liên Lạc
- **Chat với Tài Xế**: Nhấn biểu tượng chat
- **Gọi Tài Xế**: Nhấn biểu tượng điện thoại
- **Chia Sẻ Vị Trí**: Giúp tài xế tìm bạn

### Thông Báo
- Thông báo đẩy cho mỗi thay đổi trạng thái
- Cập nhật SMS cho các thay đổi quan trọng
- Cảnh báo trong ứng dụng

### Nếu Giao Hàng Bị Trễ?
- Kiểm tra điều kiện giao thông trên bản đồ
- Liên hệ tài xế để cập nhật
- Yêu cầu hoàn tiền nếu chậm đáng kể (2+ giờ)
        `,
        relatedArticles: ["order-food", "cancel-refund", "lost-items"],
      },
      "cancel-refund": {
        title: "Hủy và Hoàn Tiền",
        content: `
## Chính Sách Hủy & Hoàn Tiền PiFood

### Khi Nào Bạn Có Thể Hủy
- **Trước khi nhà hàng xác nhận**: Hoàn tiền 100%
- **Sau khi xác nhận, trước khi chế biến**: Hoàn 90%
- **Trong quá trình chế biến**: Không hoàn tiền (đồ ăn đang được làm)
- **Sau khi lấy hàng**: Không hoàn tiền

### Cách Hủy
1. Vào Đơn Hàng > Đơn Hàng Đang Hoạt Động
2. Chọn đơn hàng
3. Nhấn "Hủy Đơn Hàng"
4. Chọn lý do
5. Xác nhận hủy

### Thời Gian Hoàn Tiền
- Hoàn tiền do hủy: Ngay lập tức đến 24 giờ
- Hoàn tiền do vấn đề chất lượng: 24-48 giờ sau khi xem xét
- Hoàn tiền do thiếu món: 24-48 giờ

### Báo Cáo Vấn Đề
Đối với đơn hàng sai, thiếu món, hoặc vấn đề chất lượng:
1. Vào chi tiết đơn hàng
2. Nhấn "Báo Cáo Vấn Đề"
3. Chọn loại vấn đề
4. Thêm ảnh nếu có
5. Gửi để xem xét

### Mẹo
- Hủy sớm để được hoàn tiền đầy đủ
- Ghi lại vấn đề bằng ảnh
- Mô tả cụ thể trong báo cáo
- Kiểm tra trạng thái hoàn tiền trong PiPay
        `,
        relatedArticles: ["order-food", "track-delivery", "restaurant-issues"],
      },
      "restaurant-issues": {
        title: "Vấn Đề Với Nhà Hàng",
        content: `
## Giải Quyết Vấn Đề Với Nhà Hàng

### Các Vấn Đề Thường Gặp

#### Đơn Hàng Sai
1. Chụp ảnh các món nhận được
2. Vào chi tiết đơn hàng
3. Báo cáo "Giao Sai Món"
4. Gửi ảnh và mô tả
5. Chọn: Hoàn Tiền hoặc Giao Lại

#### Thiếu Món
1. Kiểm tra biên nhận/chi tiết đơn hàng
2. Báo cáo "Thiếu Món"
3. Liệt kê các món bị thiếu
4. Yêu cầu hoàn tiền cho món thiếu

#### Vấn Đề Chất Lượng Đồ Ăn
- Đồ ăn nguội
- Hỏng/nhiễm bẩn
- Không giống mô tả
- Lo ngại về dị ứng

### Cách Báo Cáo
1. Đơn Hàng > Chọn Đơn > Báo Cáo Vấn Đề
2. Chọn danh mục vấn đề
3. Cung cấp chi tiết và ảnh
4. Gửi trong vòng 24 giờ sau khi giao

### Thời Gian Giải Quyết
- Vấn đề đơn giản: 24 giờ
- Vấn đề phức tạp: 48-72 giờ
- Trường hợp tranh chấp: Đến 7 ngày

### Escalation
Nếu không hài lòng với kết quả:
1. Liên hệ hỗ trợ qua Chat Trực Tuyến
2. Email: support@pilife.vn
3. Yêu cầu giám sát xem xét
        `,
        relatedArticles: ["order-food", "cancel-refund", "track-delivery"],
      },
    },
    pimove: {
      "book-ride": {
        title: "Đặt Chuyến Xe",
        content: `
## Cách Đặt Xe Trên PiMove

### Bước 1: Mở PiMove
- Nhấn PiMove từ màn hình chính
- Cho phép truy cập vị trí để đón

### Bước 2: Đặt Vị Trí
1. Vị trí hiện tại được tự động phát hiện
2. Nhập địa chỉ đến
3. Hoặc chọn từ địa điểm đã lưu

### Bước 3: Chọn Loại Xe
- **PiBike**: Xe máy, nhanh nhất, rẻ nhất
- **PiCar**: Ô tô tiêu chuẩn, 4 chỗ
- **PiPremium**: Xe sang
- **PiXL**: SUV/Van, 7 chỗ

### Bước 4: Xem Lại & Đặt
1. Xem giá ước tính
2. Kiểm tra thời gian đến
3. Thêm mã khuyến mãi nếu có
4. Nhấn "Đặt Ngay"

### Bước 5: Chờ Tài Xế
- Xem thông tin và đánh giá tài xế
- Theo dõi tài xế trên bản đồ
- Liên hệ tài xế nếu cần

### Trong Suốt Chuyến Đi
- Chia sẻ chuyến với bạn bè/gia đình
- Nút khẩn cấp có sẵn
- Đánh giá tài xế sau chuyến

### Thanh Toán
- Tự động trừ từ PiPay
- Tùy chọn tip có sẵn
- Biên nhận gửi qua email
        `,
        relatedArticles: ["driver-safety", "fare-calculation", "lost-items"],
      },
      "driver-safety": {
        title: "Tính Năng An Toàn",
        content: `
## Tính Năng An Toàn Trên PiMove

### Trước Chuyến Đi
- **Tài Xế Đã Xác Minh**: Tất cả tài xế đã được kiểm tra lý lịch
- **Thông Tin Xe**: Biển số, kiểu xe được hiển thị
- **Đánh Giá Tài Xế**: Xem đánh giá từ khách khác

### Trong Suốt Chuyến Đi
- **Chia Sẻ Chuyến Đi Trực Tiếp**: Chia sẻ lộ trình với người thân
- **Nút Khẩn Cấp**: Truy cập nhanh dịch vụ khẩn cấp
- **Chat Trong Ứng Dụng**: Liên lạc mà không chia sẻ số điện thoại
- **Theo Dõi GPS**: Giám sát vị trí thời gian thực

### Mẹo An Toàn
- Xác minh tài xế và xe khớp với thông tin ứng dụng
- Ngồi ghế sau khi đi một mình
- Chia sẻ chi tiết chuyến đi với ai đó
- Tin vào trực giác của bạn

### Báo Cáo Vấn Đề
- Đánh giá tài xế trung thực
- Báo cáo lo ngại an toàn ngay lập tức
- Sử dụng "Báo Cáo Vấn Đề" trong lịch sử chuyến

### Liên Hệ Khẩn Cấp
- Khẩn cấp trong ứng dụng: Nhấn nút SOS
- Công an: 113
- Hỗ trợ: support@pilife.vn
        `,
        relatedArticles: ["book-ride", "fare-calculation", "lost-items"],
      },
      "fare-calculation": {
        title: "Cách Tính Giá Cước",
        content: `
## Cách Tính Giá Cước

### Các Thành Phần Cơ Bản
- **Giá Khởi Điểm**: Phí mở cửa mỗi chuyến
- **Khoảng Cách**: Giá mỗi km
- **Thời Gian**: Giá mỗi phút (trong tắc đường)
- **Phí Nền Tảng**: Phí dịch vụ nhỏ

### Các Yếu Tố Ảnh Hưởng Giá
- **Khoảng cách**: Xa hơn = giá cao hơn
- **Giao thông**: Tắc đường tăng chi phí thời gian
- **Nhu cầu**: Giá tăng trong giờ cao điểm
- **Loại xe**: Xe cao cấp đắt hơn

### Giá Tăng Cao Điểm
- Áp dụng khi nhu cầu cao
- Hệ số nhân hiển thị trước khi đặt
- Có thể đợi giá thấp hơn

### Phương Thức Thanh Toán
- Ví Pi (chính)
- Phương thức thanh toán đã liên kết

### Mẹo Tiết Kiệm
- Đặt xe ngoài giờ cao điểm
- Sử dụng mã khuyến mãi
- Chọn xe tiết kiệm
- Đi chung khi có thể
        `,
        relatedArticles: ["book-ride", "driver-safety"],
      },
      "lost-items": {
        title: "Đồ Vật Bỏ Quên",
        content: `
## Lấy Lại Đồ Bỏ Quên

### Các Bước Ngay Lập Tức
1. Kiểm tra "Lịch Sử Chuyến" để lấy liên hệ tài xế
2. Sử dụng chat trong ứng dụng để liên hệ tài xế
3. Báo cáo đồ bỏ quên trong ứng dụng

### Cách Báo Cáo
1. Vào Đơn Hàng > Lịch Sử Chuyến
2. Chọn chuyến đi
3. Nhấn "Đồ Bỏ Quên"
4. Mô tả đồ vật
5. Gửi báo cáo

### Điều Gì Xảy Ra Tiếp Theo
- Tài xế được thông báo ngay lập tức
- Thời gian phản hồi 24 giờ
- Phối hợp lấy lại nếu tìm thấy

### Các Tùy Chọn Lấy Lại
- Gặp tài xế tại địa điểm đã thỏa thuận
- Giao đồ đến (có thể phát sinh phí)
- Đến lấy tại trung tâm PiMove

### Mẹo
- Kiểm tra xe trước khi xuống
- Báo cáo ngay lập tức
- Cung cấp mô tả chính xác
- Phản hồi nhanh khi tài xế liên hệ

### Liên Hệ
- Hỗ trợ: support@pilife.vn
- Hotline: +84 28 1234 5678
        `,
        relatedArticles: ["book-ride", "driver-safety"],
      },
    },
    pipay: {
      "manage-wallet": {
        title: "Quản Lý Ví",
        content: `
## Quản Lý Ví PiPay

### Xem Số Dư
- Mở PiPay từ màn hình chính
- Số dư hiển thị ở trên cùng
- Nhấn để hiện/ẩn số dư

### Lịch Sử Giao Dịch
- Cuộn xuống để xem tất cả giao dịch
- Lọc theo: Ngày, Loại, Số tiền
- Tìm kiếm giao dịch cụ thể
- Xuất lịch sử ra CSV

### Phân Tích Chi Tiêu
- Xem theo Ngày/Tuần/Tháng
- Phân loại theo danh mục
- Xu hướng chi tiêu
- So sánh ngân sách

### Cài Đặt Ví
- **Đơn vị tiền**: Pi hoặc ước tính VND
- **Chế độ riêng tư**: Ẩn số dư trên màn hình chính
- **Thông báo**: Cảnh báo giao dịch
- **Hạn mức chi tiêu**: Giới hạn Ngày/Tháng

### Cài Đặt Bảo Mật
- Bật xác thực sinh trắc học
- Thiết lập mã PIN
- Cấu hình 2FA
- Xem các ứng dụng đã kết nối

### Mẹo
- Đặt cảnh báo chi tiêu
- Kiểm tra giao dịch thường xuyên
- Giữ quỹ dự phòng
- Bật tất cả tính năng bảo mật
        `,
        relatedArticles: ["send-receive", "transaction-history", "security-settings"],
      },
      "send-receive": {
        title: "Gửi và Nhận Pi",
        content: `
## Cách Gửi và Nhận Pi

### Gửi Pi

#### Cách 1: Theo Tên Người Dùng
1. Mở PiPay > Gửi
2. Nhập tên người dùng người nhận
3. Nhập số tiền
4. Thêm ghi chú (tùy chọn)
5. Xem lại và xác nhận
6. Chấp thuận trong Pi Browser

#### Cách 2: Bằng Mã QR
1. Mở PiPay > Gửi
2. Nhấn "Quét QR"
3. Quét mã QR người nhận
4. Nhập số tiền
5. Xác nhận và chấp thuận

#### Cách 3: Theo Địa Chỉ Ví
1. Mở PiPay > Gửi
2. Nhấn "Nhập Địa Chỉ"
3. Dán địa chỉ ví
4. Nhập số tiền
5. Kiểm tra kỹ địa chỉ
6. Xác nhận và chấp thuận

### Nhận Pi

#### Chia Sẻ Mã QR
1. Mở PiPay > Nhận
2. Hiển thị mã QR của bạn
3. Người khác quét để gửi Pi cho bạn

#### Chia Sẻ Địa Chỉ
1. Mở PiPay > Nhận
2. Nhấn "Sao Chép Địa Chỉ"
3. Chia sẻ với người gửi

### Hạn Mức Giao Dịch
- Hàng ngày: π 10,000
- Hàng tháng: π 50,000
- Mỗi giao dịch: π 5,000
- Liên hệ hỗ trợ để tăng hạn mức

### Mẹo Bảo Mật
- Xác minh người nhận trước khi gửi
- Bắt đầu với số tiền nhỏ cho liên hệ mới
- Không bao giờ chia sẻ cụm từ khôi phục
- Báo cáo yêu cầu đáng ngờ
        `,
        relatedArticles: ["manage-wallet", "transaction-history", "security-settings"],
      },
      "transaction-history": {
        title: "Lịch Sử Giao Dịch",
        content: `
## Hiểu Về Lịch Sử Giao Dịch

### Truy Cập Lịch Sử
1. Mở PiPay
2. Cuộn xuống hoặc nhấn "Xem Tất Cả"
3. Xem danh sách giao dịch đầy đủ

### Các Loại Giao Dịch
- **Đã Gửi**: Pi bạn gửi cho người khác
- **Đã Nhận**: Pi nhận từ người khác
- **Mua Hàng**: Thanh toán cho dịch vụ
- **Hoàn Tiền**: Số tiền được trả lại
- **Thưởng**: Tín dụng khuyến mãi

### Chi Tiết Giao Dịch
Mỗi giao dịch hiển thị:
- Ngày và giờ
- Số tiền (+ hoặc -)
- Người nhận/Người gửi
- Mã giao dịch
- Trạng thái
- Danh mục

### Tùy Chọn Lọc
- **Khoảng thời gian**: Hôm nay, Tuần này, Tùy chỉnh
- **Loại**: Tất cả, Đã gửi, Đã nhận, Mua hàng
- **Số tiền**: Phạm vi Min/Max
- **Trạng thái**: Hoàn thành, Đang chờ, Thất bại

### Xuất Dữ Liệu
1. Nhấn biểu tượng "Xuất"
2. Chọn khoảng thời gian
3. Chọn định dạng (CSV/PDF)
4. Tải xuống hoặc chia sẻ

### Trạng Thái Giao Dịch
- **Hoàn Thành**: Xử lý thành công
- **Đang Chờ**: Chờ xác nhận blockchain
- **Thất Bại**: Giao dịch không hoàn thành
- **Tranh Chấp**: Đang được xem xét
        `,
        relatedArticles: ["manage-wallet", "send-receive", "security-settings"],
      },
      "security-settings": {
        title: "Cài Đặt Bảo Mật",
        content: `
## Bảo Mật Tài Khoản PiPay

### Các Tính Năng Bảo Mật Thiết Yếu

#### 1. Xác Thực Hai Yếu Tố (2FA)
- Vào Cài Đặt > Bảo Mật > 2FA
- Chọn: SMS, Email, hoặc Ứng dụng Authenticator
- Khuyến nghị dùng Ứng dụng Authenticator để bảo mật tốt nhất

#### 2. Đăng Nhập Sinh Trắc Học
- Bật nhận diện vân tay hoặc khuôn mặt
- Cài Đặt > Bảo Mật > Sinh Trắc Học
- Đăng nhập nhanh và an toàn hơn

#### 3. Mã PIN
- Đặt mã PIN 6 chữ số cho giao dịch
- Bắt buộc khi gửi Pi
- Thay đổi định kỳ

#### 4. Quản Lý Phiên
- Xem các phiên đang hoạt động
- Đăng xuất từ xa
- Đặt thời gian tự động đăng xuất

### Kiểm Soát Chi Tiêu
- **Hạn Mức Hàng Ngày**: Chi tiêu tối đa mỗi ngày
- **Hạn Mức Giao Dịch**: Tối đa mỗi giao dịch
- **Ngưỡng Thông Báo**: Cảnh báo cho số tiền lớn

### Cảnh Báo Bảo Mật
- Đăng nhập từ thiết bị mới
- Giao dịch lớn
- Thay đổi mật khẩu
- Đăng nhập thất bại

### Cần Làm Gì Nếu Bị Xâm Phạm
1. Đổi mật khẩu ngay lập tức
2. Bật 2FA nếu chưa kích hoạt
3. Xem lại các giao dịch gần đây
4. Báo cáo hoạt động trái phép
5. Liên hệ hỗ trợ: security@pilife.vn

### Thực Hành Tốt Nhất
- Sử dụng mật khẩu duy nhất, mạnh
- Không bao giờ chia sẻ thông tin đăng nhập
- Cập nhật ứng dụng thường xuyên
- Cẩn thận với lừa đảo
- Xác minh tất cả yêu cầu thanh toán
        `,
        relatedArticles: ["manage-wallet", "send-receive", "transaction-history"],
      },
    },
    account: {
      "update-profile": {
        title: "Cập Nhật Thông Tin Cá Nhân",
        content: `
## Cách Cập Nhật Hồ Sơ

### Truy Cập Cài Đặt Hồ Sơ
1. Nhấn biểu tượng Hồ Sơ (góc phải dưới)
2. Nhấn "Chỉnh Sửa Hồ Sơ"

### Những Gì Bạn Có Thể Cập Nhật
- **Tên**: Tên hiển thị của bạn
- **Ảnh**: Ảnh đại diện
- **Điện thoại**: Số liên hệ
- **Email**: Địa chỉ email
- **Địa chỉ**: Địa chỉ giao hàng mặc định

### Đổi Ảnh Đại Diện
1. Nhấn vào ảnh hiện tại
2. Chọn: Camera hoặc Thư viện
3. Cắt và điều chỉnh
4. Lưu thay đổi

### Cập Nhật Thông Tin Liên Hệ
- Thay đổi điện thoại cần xác minh OTP
- Thay đổi email cần xác nhận liên kết

### Cài Đặt Quyền Riêng Tư
- Kiểm soát ai nhìn thấy hồ sơ
- Quản lý tùy chọn chia sẻ dữ liệu
        `,
        relatedArticles: ["change-password", "notifications", "delete-account"],
      },
      "change-password": {
        title: "Đổi Mật Khẩu",
        content: `
## Cách Đổi Mật Khẩu

### Các Bước Đổi Mật Khẩu
1. Vào Hồ Sơ > Cài Đặt
2. Nhấn "Bảo Mật"
3. Chọn "Đổi Mật Khẩu"
4. Nhập mật khẩu hiện tại
5. Nhập mật khẩu mới
6. Xác nhận mật khẩu mới
7. Nhấn "Lưu"

### Yêu Cầu Mật Khẩu
- Tối thiểu 8 ký tự
- Ít nhất một chữ hoa
- Ít nhất một số
- Ít nhất một ký tự đặc biệt

### Quên Mật Khẩu?
1. Nhấn "Quên Mật Khẩu" ở màn hình đăng nhập
2. Nhập email hoặc điện thoại
3. Kiểm tra liên kết/mã đặt lại
4. Tạo mật khẩu mới

### Mẹo Bảo Mật
- Không dùng lại mật khẩu
- Đổi mỗi 3-6 tháng
- Sử dụng trình quản lý mật khẩu
        `,
        relatedArticles: ["update-profile", "notifications", "security-settings"],
      },
      notifications: {
        title: "Cài Đặt Thông Báo",
        content: `
## Quản Lý Thông Báo

### Các Loại Thông Báo
- **Đơn hàng**: Cập nhật trạng thái, cảnh báo giao hàng
- **Khuyến mãi**: Ưu đãi và giảm giá
- **Tài khoản**: Cảnh báo bảo mật, cập nhật
- **Tin nhắn**: Thông báo chat

### Cách Tùy Chỉnh
1. Hồ Sơ > Cài Đặt > Thông Báo
2. Bật/tắt từng danh mục
3. Chọn phương thức gửi (push, email, SMS)

### Cài Đặt Khuyến Nghị
- Giữ thông báo đơn hàng BẬT
- Giữ cảnh báo bảo mật BẬT
- Khuyến mãi tùy theo sở thích

### Giờ Im Lặng
- Đặt thời gian tắt thông báo
- Cảnh báo khẩn cấp vẫn đến
        `,
        relatedArticles: ["update-profile", "change-password"],
      },
      "delete-account": {
        title: "Xóa Tài Khoản",
        content: `
## Cách Xóa Tài Khoản

### Trước Khi Xóa
- Tải xuống dữ liệu của bạn
- Hoàn thành đơn hàng đang chờ
- Rút số dư Pi còn lại
- Hủy các đăng ký

### Quy Trình Xóa
1. Hồ Sơ > Cài Đặt > Tài Khoản
2. Nhấn "Xóa Tài Khoản"
3. Nhập mật khẩu để xác nhận
4. Chọn lý do xóa
5. Xác nhận xóa

### Những Gì Bị Xóa
- Thông tin hồ sơ
- Lịch sử đơn hàng
- Địa chỉ đã lưu
- Tùy chọn cá nhân

### Những Gì Chúng Tôi Giữ (theo yêu cầu pháp luật)
- Hồ sơ giao dịch (7 năm)
- Nhật ký bảo mật
- Dữ liệu tuân thủ pháp lý

### Kích Hoạt Lại
- Thời gian ân hạn 30 ngày
- Đăng nhập để hủy xóa
- Sau 30 ngày, vĩnh viễn
        `,
        relatedArticles: ["update-profile", "change-password"],
      },
    },
    troubleshooting: {
      "app-not-loading": {
        title: "Ứng Dụng Không Tải Được",
        content: `
## Khắc Phục Lỗi Tải Ứng Dụng

### Sửa Nhanh
1. **Đóng và mở lại** ứng dụng
2. **Kiểm tra kết nối** internet
3. **Khởi động lại** thiết bị
4. **Cập nhật** lên phiên bản mới nhất

### Xóa Bộ Nhớ Cache
**Android:**
1. Cài Đặt > Ứng Dụng > Life with Pi
2. Bộ Nhớ > Xóa Cache

**iOS:**
1. Xóa và cài lại ứng dụng
2. Hoặc: Cài Đặt > Life with Pi > Xóa Dữ Liệu

### Vấn Đề Mạng
- Thử chuyển WiFi/Di động
- Tắt VPN nếu đang dùng
- Kiểm tra các ứng dụng khác có hoạt động không

### Vẫn Không Hoạt Động?
- Kiểm tra trạng thái máy chủ trên mạng xã hội
- Liên hệ hỗ trợ với chi tiết lỗi
        `,
        relatedArticles: ["payment-failed", "location-issues", "verification"],
      },
      "payment-failed": {
        title: "Thanh Toán Thất Bại",
        content: `
## Giải Quyết Lỗi Thanh Toán

### Nguyên Nhân Thường Gặp
- Số dư Pi không đủ
- Vấn đề kết nối mạng
- Pi Browser chưa cập nhật
- Kết nối ví đã hết hạn

### Giải Pháp

#### Kiểm Tra Số Dư
1. Mở PiPay
2. Xác minh có đủ tiền
3. Tính cả phí trong tính toán

#### Kết Nối Lại Ví
1. Cài Đặt > Phương Thức Thanh Toán
2. Ngắt kết nối Ví Pi
3. Kết nối lại và xác nhận

#### Cập Nhật Pi Browser
- Đảm bảo phiên bản mới nhất
- Đăng xuất và đăng nhập lại

### Nếu Đã Bị Trừ Tiền Nhưng Thất Bại
1. Đợi 15 phút
2. Kiểm tra lịch sử giao dịch
3. Nếu chưa hoàn tiền, liên hệ hỗ trợ
4. Cung cấp mã giao dịch

### Liên Hệ Hỗ Trợ
- Email: support@pilife.vn
- Bao gồm: Mã giao dịch, số tiền, thời gian
        `,
        relatedArticles: ["app-not-loading", "connect-wallet", "manage-wallet"],
      },
      "location-issues": {
        title: "Lỗi Dịch Vụ Định Vị",
        content: `
## Khắc Phục Vấn Đề Vị Trí

### Bật Dịch Vụ Định Vị

**Android:**
1. Cài Đặt > Vị Trí > BẬT
2. Quyền ứng dụng > Life with Pi > Cho Phép

**iOS:**
1. Cài Đặt > Quyền Riêng Tư > Vị Trí
2. Life with Pi > Khi Sử Dụng

### Cải Thiện Độ Chính Xác
- Bật chế độ Độ Chính Xác Cao
- Đứng gần cửa sổ/ngoài trời
- Chờ khóa GPS

### Vấn Đề Thường Gặp

**Vị trí không cập nhật:**
- Bật/tắt vị trí
- Khởi động lại ứng dụng

**Vị trí hiển thị sai:**
- Nhập địa chỉ thủ công
- Kéo ghim đến vị trí đúng

**"Vị trí không khả dụng":**
- Kiểm tra cài đặt vị trí thiết bị
- Cấp quyền cho ứng dụng
        `,
        relatedArticles: ["app-not-loading", "book-ride", "order-food"],
      },
      verification: {
        title: "Vấn Đề Xác Minh",
        content: `
## Giải Quyết Vấn Đề Xác Minh

### Xác Minh Email
- Kiểm tra thư mục spam/rác
- Thêm noreply@pilife.vn vào danh bạ
- Yêu cầu email xác minh mới
- Đợi 5 phút giữa các lần yêu cầu

### Xác Minh Điện Thoại
- Đảm bảo mã quốc gia đúng
- Kiểm tra hộp thư SMS
- Đợi 60 giây để thử lại
- Thử tùy chọn cuộc gọi thoại

### Xác Minh Pi Network
- Cập nhật Pi Browser
- Đăng xuất và đăng nhập lại
- Kiểm tra trạng thái ứng dụng Pi Network
- Đảm bảo KYC đã hoàn thành

### Vẫn Gặp Vấn Đề?
- Liên hệ: support@pilife.vn
- Bao gồm: Tên người dùng, phương thức liên hệ đã dùng
        `,
        relatedArticles: ["create-account", "connect-wallet", "app-not-loading"],
      },
    },
  },
}

function HelpArticleContent() {
  const { category, article } = useParams()
  const router = useRouter()
  const { language } = useI18n()
  const [helpful, setHelpful] = useState<boolean | null>(null)

  const articleData =
    helpArticles[language]?.[category as string]?.[article as string] ||
    helpArticles["en"]?.[category as string]?.[article as string]

  if (!articleData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            {language === "vi" ? "Không tìm thấy bài viết" : "Article not found"}
          </p>
          <Button onClick={() => router.back()}>{language === "vi" ? "Quay lại" : "Go Back"}</Button>
        </div>
      </div>
    )
  }

  const t = {
    backToHelp: language === "vi" ? "Trung Tâm Hỗ Trợ" : "Help Center",
    wasHelpful: language === "vi" ? "Bài viết này có hữu ích không?" : "Was this article helpful?",
    thankYou: language === "vi" ? "Cảm ơn phản hồi của bạn!" : "Thank you for your feedback!",
    relatedArticles: language === "vi" ? "Bài viết liên quan" : "Related Articles",
    stillNeedHelp: language === "vi" ? "Vẫn cần trợ giúp?" : "Still need help?",
    contactSupport: language === "vi" ? "Liên hệ hỗ trợ" : "Contact Support",
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-bold mt-6 mb-3">
            {line.replace("## ", "")}
          </h2>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-semibold mt-4 mb-2">
            {line.replace("### ", "")}
          </h3>
        )
      }
      if (line.startsWith("#### ")) {
        return (
          <h4 key={index} className="font-semibold mt-3 mb-1">
            {line.replace("#### ", "")}
          </h4>
        )
      }
      if (line.startsWith("- **") || line.startsWith("1. **") || line.match(/^\d+\. \*\*/)) {
        const match = line.match(/^[-\d.]+\s*\*\*([^*]+)\*\*:?\s*(.*)/)
        if (match) {
          return (
            <li key={index} className="ml-4 mb-1">
              <strong>{match[1]}</strong>
              {match[2] && `: ${match[2]}`}
            </li>
          )
        }
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-4 mb-1 list-disc">
            {line.replace("- ", "")}
          </li>
        )
      }
      if (line.match(/^\d+\. /)) {
        return (
          <li key={index} className="ml-4 mb-1 list-decimal">
            {line.replace(/^\d+\. /, "")}
          </li>
        )
      }
      if (line.startsWith("**Problem**") || line.startsWith("**Vấn đề**")) {
        return (
          <p key={index} className="font-semibold mt-3 text-red-600">
            {line.replace(/\*\*/g, "")}
          </p>
        )
      }
      if (line.trim() === "") {
        return <br key={index} />
      }
      // Handle inline bold
      const boldedLine = line.split(/\*\*([^*]+)\*\*/).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold">
            {part}
          </strong>
        ) : (
          part
        ),
      )
      return (
        <p key={index} className="mb-2 text-muted-foreground">
          {boldedLine}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="container flex items-center h-14 px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="ml-3 text-sm text-muted-foreground">{t.backToHelp}</span>
        </div>
      </div>

      <div className="container max-w-3xl px-4 py-6">
        {/* Article Title */}
        <h1 className="text-2xl font-bold mb-6">{articleData.title}</h1>

        {/* Article Content */}
        <div className="prose prose-sm max-w-none">{renderContent(articleData.content)}</div>

        {/* Helpful Section */}
        <Card className="mt-8 p-4">
          {helpful === null ? (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t.wasHelpful}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1 bg-transparent" onClick={() => setHelpful(true)}>
                  <ThumbsUp className="h-4 w-4" />
                  {language === "vi" ? "Có" : "Yes"}
                </Button>
                <Button variant="outline" size="sm" className="gap-1 bg-transparent" onClick={() => setHelpful(false)}>
                  <ThumbsDown className="h-4 w-4" />
                  {language === "vi" ? "Không" : "No"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <span>{t.thankYou}</span>
            </div>
          )}
        </Card>

        {/* Related Articles */}
        {articleData.relatedArticles && articleData.relatedArticles.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-4">{t.relatedArticles}</h3>
            <div className="space-y-2">
              {articleData.relatedArticles.map((slug: string) => {
                const relatedData =
                  helpArticles[language]?.[category as string]?.[slug] ||
                  helpArticles["en"]?.[category as string]?.[slug]
                if (!relatedData) return null
                return (
                  <Link
                    key={slug}
                    href={`/help/${category}/${slug}`}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span>{relatedData.title}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Contact Support */}
        <Card className="mt-8 p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{t.stillNeedHelp}</h3>
              <p className="text-sm text-muted-foreground">
                {language === "vi" ? "Đội ngũ hỗ trợ sẵn sàng 24/7" : "Our support team is available 24/7"}
              </p>
            </div>
            <Link href="/contact">
              <Button size="sm" className="gap-1">
                <MessageCircle className="h-4 w-4" />
                {t.contactSupport}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function HelpArticlePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <HelpArticleContent />
    </Suspense>
  )
}
