// FCM 자동 발송용 cron
// var cron = require('node-cron');

// 매일 18시, 21시에 작동
// cron.schedule('0 18,21 * * *', function () {
    console.log('오후 ' + (new Date()).getHours() + '시 알림 발송 시작');

    // FDB 접근용
    var admin = require("firebase-admin");

    // mySQL 접근용
    var mysql = require('mysql');

    // FCM
    var FCM = require('fcm-push');
    var serverkey = "AAAAPZnjvyY:APA91bGiDJRNu33MgiXZs5FZ9hdhSXXDZU9Pzm3qZXylTt-sRV6ckKgvygidWqclpGHVJPoazKkpTPF8CT4bYQwImIQ3B9ETGg3z2LEKDBOPr5zYbAuU-RpPsA2w1nFRB13aoeU1oU3F";
    var fcm = new FCM(serverkey);

    // // jQuery
    // var $ = require('jquery');

    // mySQL connection
    var con = mysql.createConnection({
        host: "192.168.0.61",
        user: "day",
        password: "word",
        database: "one_db"
    });

    // FDB 권한설정
    admin.initializeApp({
        credential: admin.credential.cert({
                "type": "service_account",
                "project_id": "prac-94bd2",
                "private_key_id": "d05bb3dee9a7f9663676ad329685667aec80e82c",
                "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDfiCKRejGwEwHL\nclOzPTEiEe1IV7Zpd7oUC41SLFmgMV+nLGdIsEjzFt7N1ftNI3WyjA8/7LEAImPV\ngz/si/ZO9BQVXGTlbe5xSU2/xGd+O+EHhcSLHFRF18gAp+4aAFO8F4FA1NMAdqfF\nKNz4ivc7d/eOv/LVRXN6F+vdrrgK0JA0wlF2X+1CiInRMnuYRrg7SJyHTKyXO/uM\nTtwrkeCL9d7WmOb3vGfZKod4MZuVGCz4qNLA/nG7+4LDT5DVFVLfOayOatsh23pD\ns4jAvFWiqf3yoNicnLokgz0bXgaJvSXrJWKq1Vk+BVzcytCbvpUG7xDa20LgsfHk\ngkQNeu25AgMBAAECggEAGU7UexwWnBTK0znyeAypj23wK4yivnYrvzE/otoam6R7\na/X/C5/J4pvoRe3AMg+dt8VbxKULtTQvkXD2v9Vo4a+IxpJbag50PKdMAjY+cXBe\nHffrNMTUVcQEhO5+ars2v8j5fVmbOiY1AIGL4yf4reb7RFI/MB5Y4K3sqoCpna+h\nLzu48EdFVpkaFnzl6eXqG4waVDyqH/bRX3o8jrkDXmocWLuAPSKW7WUcXqhtsylG\nB/GzutUChxy2l86MUyPM0zJHWfTxaWwXRlZ2+Pop1PYeDfUgUUmkUMyzSibdyDQg\n1HTJRFTyRPSQX7tUl4T1JDgHk6c7+qjcljxdlvBOMQKBgQD4ZIuV0SZ85e1AyGv6\nKERawph4yxcSkGQooxvDdPKMHDgvnpQYWBwfR6D4LH3TFqrQIOiblkIj/4wysg2q\npD6yGkC9gijNTR7Q3fZsxSIkNkQAbCSpHEIKP8M3iUlv+Ecv/L4VGFBDZlKHeRig\ncyH42LvrBRMkJjH1SKR5iAMgvwKBgQDmYKyVavqXNvwkM3Q9lJYrL+IIZf2gxG4Q\ny9FjNAPdFOHidW+6UJblnoIvQH8Ngr2kAvSrNgbHlzMVZa1mnZUTn+E/OIwvSOK6\nJnjjsiTt+A/FWsQCA6rzbpUZWFHdZaWsxKuOZXQorwb4khN4g12oJXcNsfD7eMfG\niriJIXyXhwKBgQDrY40MCsooblQpokUBKYutXt/TCNLymrbv87Jpxbfcoxlztxmt\nAEKWOfEHflI26jIxTh5g40IGjzOzDxz4avGnIk3byS8Vb1IWqWHPrfkuy+YhaFpN\nkCPdRpOfW5CmdWgwx5jysLnPRXZMP6vg0XqOMgXTMFn1VeTeB1smeIhOTQKBgQDC\nh4FTjgjZpPFV9CjEUvJWt1EKvGxk01kJT8GYHfThOt/eJEHatnAkpirRkYl3NB3E\nH0bQR4eEA5V8DOZVztxxvMArbSlaSBZDD3dm9Scf1iYjBJicBtLUSV0XEK/X3hv+\nffdK/zoNnHWrcVWFno94C2KzKr0M6xjt+ncGPEODgwKBgHeL1vvuj3tfRgWDoCFX\nrhNSx2Pq11pJ30AkET6QBfecbwbo3uUq2PMbvqKp0ghrIrlPuvZ6VbGexPCJIQP8\nTP1EAuP+dQBmVfvwrt9M16z0eEZXjymR2RQ1xfSvo8WBTiJJ7pCRtRqiaPRT3JPi\nt5iXxbXJoFYF0t/TJkw51kEZ\n-----END PRIVATE KEY-----\n",
                "client_email": "firebase-adminsdk-5k5b2@prac-94bd2.iam.gserviceaccount.com",
                "client_id": "116506914974868325410",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://accounts.google.com/o/oauth2/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5k5b2%40prac-94bd2.iam.gserviceaccount.com"
            }
        ),
        databaseURL: "https://prac-94bd2.firebaseio.com"
    });

    // FDB 접근
    var db = admin.database();
    var ref = db.ref("/member");

    // FDB에서 회원정보 가져오기
    ref.once("value", function(snapshot) {

        // 회원목록
        var members = snapshot.val();

        // 알림을 받는 회원 그룹용
        var naverGroup = {};

        // 회원가입 시 자녀 성별 체크에 따른 그룹 분류용 (중복 가능)
        // 남자
        var mGroup = {};
        // 여자
        var fGroup = {};


        for (var member in members) {

            // 현재 시간에 알림을 받기로 한 회원들만 처리하기 (오후 6시, 오후 9시)
            if(members[member].time == (new Date()).getHours()) {
                // 여기서 하기 ~
            }

            if(members[member].time != -1) {

                // 알림 허용한(FCM 토큰이 존재하는) 회원 그룹
                naverGroup[members[member].id] = members[member].token;


                // 자녀 성별 "여자" 체크했던 회원 그룹
                if(members[member].f != "false") {
                    fGroup[members[member].id] = members[member].token;
                }

                // 자녀 성별 "남자" 체크했던 회원 그룹
                if(members[member].m != "false") {
                    mGroup[members[member].id] = members[member].token;
                }

            }

        }

        // 네이버 인기검색어 알림메세지 일괄 전송 (1~10위)
        con.connect(function (err) {
            if (err) throw err;
            con.query("SELECT * FROM test_naver", function (err, result, fields) {
                if (err) throw err;

                var msg = '';
                for(var index in result) {
                    msg += '\n' + result[index].rank + '. ' + result[index].keyword;
                }

                for(var member in naverGroup) {

                    var urlParam = 'id='+ member +'&type=naver';

                    var message = {
                        to : naverGroup[member],
                        notification : {
                            title: 'OneDay OneWord',
                            body: '오늘의 대학생 인기 검색어' + msg,
                            icon: 'https://trello-attachments.s3.amazonaws.com/5a1b6eab16a466325a2ae3d1/5a475826c9c90ae415b6db9a/809e2ba81d3af44dd8391a2dab0b2704/asdfasdf.PNG',
                            click_action: 'http://192.168.0.87:8000/main/index?' + urlParam
                        }
                    };

                    fcm.send(message, function(err,response){
                        if(err) {
                            console.log("네이버 발송 중 오류 !");
                            console.log(err);
                        } else {
                            console.log("Successfully sent with resposne :",response);
                        }
                    });
                }

            });

            // 10대 여자 관심 키워드 일괄 전송 (1~3위)
            con.query("SELECT keyword, siteno FROM test_keyword where siteno = 1 and date(regdate) = curdate() - interval 1 day group by keyword, siteno order by count(*) desc limit 0, 3", function (err, result, fields) {
            // con.query("SELECT keyword, siteno FROM test_keyword where siteno = 1 and date(regdate) = curdate() group by keyword, siteno order by count(*) desc limit 0, 3", function (err, result, fields) {
                if (err) throw err;
                // console.log(JSON.stringify(result));

                var msg = '';
                for(var index in result) {
                    msg += '\n' + result[index].keyword;
                }

                for(var member in fGroup) {

                    var urlParam = 'id='+ member +'&type=f';

                    var message = {
                        to : fGroup[member],
                        notification : {
                            title: 'OneDay OneWord',
                            body: '오늘의 여자사람 관심사 ٩(ˊᗜˋ*)و' + msg,
                            icon: 'https://trello-attachments.s3.amazonaws.com/5a1b6eab16a466325a2ae3d1/5a475826c9c90ae415b6db9a/809e2ba81d3af44dd8391a2dab0b2704/asdfasdf.PNG',
                            click_action: 'http://192.168.0.87:8000/main/index?' + urlParam
                        }
                    };

                    fcm.send(message, function(err,response){
                        if(err) {
                            console.log("여자 발송 중 오류 !");
                            console.log(err);
                        } else {
                            console.log("Successfully sent with resposne :",response);
                        }
                    });
                }

            });

            // 10대 남자 관심 키워드 일괄 전송 (1~3위)
            con.query("SELECT keyword, siteno FROM test_keyword where siteno = 2 and date(regdate) = curdate() - interval 1 day group by keyword, siteno order by count(*) desc limit 0, 3", function (err, result, fields) {
            // con.query("SELECT keyword, siteno FROM test_keyword where siteno = 2 and date(regdate) = curdate() group by keyword, siteno order by count(*) desc limit 0, 3", function (err, result, fields) {
                if (err) throw err;
                // console.log(JSON.stringify(result));

                var msg = '';
                for(var index in result) {
                    msg += '\n' + result[index].keyword;
                }

                for(var member in mGroup) {

                    var urlParam = 'id='+ member +'&type=m'

                    var message = {
                        to : mGroup[member],
                        notification : {
                            title: 'OneDay OneWord',
                            body: '오늘의 남자사람 관심사 (･ิω･ิ)' + msg,
                            icon: 'https://trello-attachments.s3.amazonaws.com/5a1b6eab16a466325a2ae3d1/5a475826c9c90ae415b6db9a/809e2ba81d3af44dd8391a2dab0b2704/asdfasdf.PNG',
                            click_action: 'http://192.168.0.87:8000/main/index?' + urlParam
                        }
                    };

                    fcm.send(message, function(err,response){
                        if(err) {
                            console.log("남자 발송 중 오류 !");
                            console.log(err);
                        } else {
                            console.log("Successfully sent with resposne :",response);
                        }
                    });

                }

            });

        });


    });
// });









