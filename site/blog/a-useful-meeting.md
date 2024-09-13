<post-metadata>
  <post-title>A Useful Meeting</post-title>
  <post-date>2024-09-13</post-date>
  <post-tags>meetings, dns</post-tags>
</post-metadata>

Seems the [Pareto Principle](https://en.wikipedia.org/wiki/Pareto_principle) can be applied to meetings. The first 80%, tend to be a waste of time and could have been an email. But 20% of emails/messages, should have been a meeting. Deep troubleshooting (the engineer's version of [Deep Work](https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/)) across multiple services/technologies should be weighted towards real time when possible. Three to four people is about the max, not twenty people on a call. This gives introverts the opportunity to speak up and decreases distractions. It is a lot harder to wander off and start checking your email when the chances your input is needed go from one in twenty to one in four. I have countless examples (looking at you IPsec tunnels) of miscommunications or misunderstandings that required multiple exchanges to resolve. A great example follows...

### First Contact
Last month, a coworker pinged me on Slack about intermittent connectivity to a webpage. Initially, they presented this as a network issue and had moved their deployment between VPCs to remediate. After some quick troubleshooting, it was apparent that this was related to intermittent DNS resolution and not network connectivity. You might ask, "well how was that apparent to you?". DNS is the first step in just about every HTTP request to a given webpage. I pulled up `dig` to verify. We'll assume the site was https://aws.com.

1. `dig aws.com` - my local DNS server to resolve the DNS record
2. `dig @8.8.8.8 aws.com` - a public DNS server to resolve the DNS record
3. `dig @172.20.3.28` - the internal DNS server used by users on our internal VPN

### Works on My Machine
I could resolve the record with some DNS servers like 8.8.8.8, but not my local DNS server. My initial thought was an issue with DNS propagation to my local DNS server. My local DNS server is an unbound/pihole setup I threw together and not the greatest troubleshooting tool. I ruled out my local DNS server as a data point. In hindsight, my DNS server was working as expected. I was able to hit the site via my phone and laptop using 8.8.8.8 as a DNS server. I contacted one of the users reporting issues. They seemed to have the most issues right after a deployment (again, maybe an issue with propagation?). Based on their feedback, we decided to test after their next deployment.

### One Month Later
A month later... turns out the issue had not been resolved. No one had reached out, and the deployment of this app had been delayed by a month! The coworker requested that we add additional subnets to a VPC because he was having similar issues loading this webpage. Drilling down into the issue we again came back to DNS. This time we schedule a troubleshooting call.

### More `Dig`ging
I setup a couple `dig` queries again, but this time on a loop. I added in a name server from the Route53 zone and removed the VPN DNS server since it seemed irrelevant.

```
$ while true; do dig aws.com && sleep 10; done
$ while true; do dig @8.8.8.8 aws.com && sleep 10; done
$ while true; do dig @ns-1.awsdns-1.com aws.com && sleep 10; done
```

The results were not much different from my tests a month ago. I received NXDOMAIN responses from my local server and NOERROR from 8.8.8.8. I always received NOERROR from the AWS name server. After running those constantly for some time, I started to notice a shift. Sometimes 8.8.8.8 would return NXDOMAIN. I went down the rabbit hole of healthchecks and other DNS extensions used by AWS. I adjusted the DNS record in Route53 to test a theory we had on alias vs non-aliased records. Turning alias features off in Route53 did not have a permanent impact. We had a false positive when we flipped to a non-aliased CNAME record and all of a sudden queries started returning NOERROR from 8.8.8.8 where previously they had been NXDOMAIN. After a bit, we were back to NXDOMAIN roughly half the time and NOERROR the other half. Since the AWS name server results were consistent, I ruled out any Route53 specific features.

### `Whois` Setting All These Name Servers?
After staring at these DNS queries for a bit, I started to notice that sometimes the name servers listed in the AUTHORITY SECTION did not match other queries. That's strange, I wonder who the registrar is here and what NS records are set. So `whois` to the rescue!

```
$ whois aws.com
...
Name Server: NS-1.AWSDNS-1.ORG
Name Server: NS-1.AWSDNS-1.CO.UK
Name Server: NS-1.AWSDNS-1.COM
Name Server: NS-1.AWSDNS-1.NET
Name Server: NS-2.AWSDNS-2.COM
Name Server: NS-2.AWSDNS-2.CO.UK
Name Server: NS-2.AWSDNS-2.ORG
Name Server: NS-2.AWSDNS-2.NET
```

Eight name servers?? AWS only hands out four name servers when creating a new Route53 zone... ohhhh nooooo.

That's when I went digging for the other zone, and found it in another of our AWS accounts. It seems an abandoned migration project was the root of all evil (in this story anyway). Name servers for two completely separate Route53 zones (in two completely separate AWS accounts) were both configured in GoDaddy (the registrar for this domain). All prior records had been duplicated and so existing records did not exhibit the same issues as the new record my coworker had added in only one of the two zones for his new web app. Problem solved!

### Conclusion
One troubleshooting call a month ago would have saved a LOT of frustration for this team. A quick call, instead of countless slack messages, would have resulted in this project moving forward a month earlier!

**P.S. It's always DNS.**
